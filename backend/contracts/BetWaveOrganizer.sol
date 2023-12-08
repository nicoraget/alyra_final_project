// SPDX-License-Identifier: MIT

import "../contracts/SimpleBet.sol";
import "../contracts/BetWaveDAO.sol";

pragma solidity ^0.8.19;

    error noWinner();
    error notOwner();
    error wrongStep();

contract BetWaveOrganizer {

    enum BetStatus {
        betTime,
        VoteTime,
        VoteEnded
    }

    struct Bet {
        string betName;
        string compName1;
        string compName2;
        address owner;
        mapping(address => uint256) validatorsResult;
        address[] validatorList;
        uint256 voteCount;
        uint256 comp1VoteCount;
        uint256 comp2VoteCount;
        BetStatus betStatus;
    }

    mapping(address => Bet) public betList;


    event newBet(address, string, string);
    event startValidation(address);
    event startCount(address);

    BetWaveDAO betWaveDAO;
    address public lastSimpleBetAddress;

    modifier doesUserExist() {
        if (betWaveDAO.userToId(msg.sender) == 0)
            revert notRegistered();
        _;
    }

    modifier onlyOwner(address _betAddress) {
        if (betList[_betAddress].owner != msg.sender) revert notOwner();
        _;
    }

    modifier onlyValidator() {
        (address _userAddress, ,) = betWaveDAO.validators(msg.sender);
        if (_userAddress != msg.sender)
            revert notValidator();
        _;
    }

    modifier isCorrectStep(BetStatus _betStatus, address _betAddress) {
        if (betList[_betAddress].betStatus != _betStatus)
            revert wrongStep();
        _;
    }

    constructor(address _betWaveDAOAddress) payable {
        betWaveDAO = BetWaveDAO(payable(_betWaveDAOAddress));
    }

    // GETTERS //
    function getBetValidatorsResult(address _betAddress) external view returns (uint) {
        return betList[_betAddress].validatorsResult[msg.sender];
    }

    function getvalidatorAddress(address _betAddress, uint _id) external view returns (address) {
        return betList[_betAddress].validatorList[_id];
    }

    // GETTERS //

    function deployNewBet(string memory _betName, string memory _compName1, string memory _compName2)
    external
    doesUserExist
    {
        require(
            betWaveDAO.validatorNumber() >= betWaveDAO.validatorNumberRequired(),
            "not enough validator"
        );
        address contractAddress = address(
            new SimpleBet(
                _betName,
                _compName1,
                _compName2,
                address(this),
                address(betWaveDAO)));
        lastSimpleBetAddress = contractAddress;
        betList[contractAddress].betName = _betName;
        betList[contractAddress].compName1 = _compName1;
        betList[contractAddress].compName2 = _compName2;
        betList[contractAddress].owner = msg.sender;
        betList[contractAddress].betStatus = BetStatus.betTime;
        emit newBet(contractAddress, _compName1, _compName2);
    }

    function startBetValidation(address _betAddress)
    external
    onlyOwner(_betAddress)
    isCorrectStep(BetStatus.betTime, _betAddress)
    {
        betList[_betAddress].betStatus = BetStatus.VoteTime;
        emit startValidation(_betAddress);
    }

    function setBetVote(uint256 _compId, address _betAddress) public
    isCorrectStep(BetStatus.VoteTime, _betAddress) {
        require(_compId < 2, "unexisting competitors");
        (address userAddress, ,) = betWaveDAO.validators(msg.sender);
        if (userAddress != msg.sender) revert notValidator();

        if (_compId == 0) {
            betList[_betAddress].comp1VoteCount++;
            betList[_betAddress].voteCount++;
            betList[_betAddress].validatorsResult[msg.sender] = 0;
            betList[_betAddress].validatorList.push(msg.sender);
        } else if (_compId == 1) {
            betList[_betAddress].comp2VoteCount++;
            betList[_betAddress].voteCount++;
            betList[_betAddress].validatorsResult[msg.sender] = 1;
            betList[_betAddress].validatorList.push(msg.sender);
        }
        if (betList[_betAddress].voteCount >= betWaveDAO.validatorNumberRequired()) {
            emit startCount(_betAddress);
            tallyVote(_betAddress);
        }
    }

    function tallyVote(address _betAddress) internal
    {
        if (
            betList[_betAddress].comp1VoteCount >
            betList[_betAddress].comp2VoteCount
        ) {
            //check if quorum is reached
            if (
                (betList[_betAddress].comp1VoteCount * 100) /
                betList[_betAddress].voteCount >=
                betWaveDAO.betQuorum()
            ) {
                SimpleBet(payable(_betAddress)).setWinnerId(0);
                feesOrchestrator(_betAddress, 0);
                betList[_betAddress].betStatus = BetStatus.VoteEnded;
            }
        } else if (
            betList[_betAddress].comp1VoteCount <
            betList[_betAddress].comp2VoteCount
        ) {
            //check if quorum is reached
            if (
                (betList[_betAddress].comp2VoteCount * 100) /
                betList[_betAddress].voteCount >=
                betWaveDAO.betQuorum()
            ) {
                SimpleBet(payable(_betAddress)).setWinnerId(1);
                feesOrchestrator(_betAddress, 1);
                betList[_betAddress].betStatus = BetStatus.VoteEnded;
            }
        } else
        {
            betList[_betAddress].betStatus = BetStatus.VoteEnded;
            revert noWinner();
        }
    }

    function feesOrchestrator(
        address _betAddress,
        uint256 _expectedValidatorResultId
    ) internal {
        SimpleBet(payable(_betAddress)).sendPlatfromAndCreatorFees(
            betWaveDAO.platformFees(),
            betWaveDAO.creatorFees(),
            betList[_betAddress].owner);
        uint256 rewardValidator = SimpleBet(payable(_betAddress)).calculateValidatorReward(betWaveDAO.validatorFees());
        for (
            uint256 i = 0;
            i < betList[_betAddress].validatorList.length;
            i++
        ) {
            if (
                betList[_betAddress].validatorsResult[
                betList[_betAddress].validatorList[i]
                ] == _expectedValidatorResultId
            ) {
                SimpleBet(payable(_betAddress)).sendValidatorFees(
                    betList[_betAddress].validatorList[i],
                    rewardValidator
                );
            } else {
                //betWaveDAO.validators[betList[_betAddress].validatorList[i]].strike++;
            }
        }
        SimpleBet(payable(_betAddress)).setFeesBooleanToTrue();
    }

    /*    function sendEther(address _to, uint256 _amount) internal {
            (bool sent, bytes memory received) = payable(_to).call{value : _amount}(
                ""
            );
            require(sent, "Failed to send Ether");
        }

        receive() external payable {
            require(msg.value >= 5 * 1e4 wei, "you can't send less than 50k wei");
        }

        fallback() external payable {
            require(msg.data.length == 0, "No fallback desired");
        }*/
}
