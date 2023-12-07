import "../contracts/SimpleBet.sol";
import "../contracts/BetWaveDAO.sol";
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

    error noWinner();
    error notOwner();
    error wrongStep();

contract BetWaveOrganizer {
    string calledFallbackFun = "albatros";

    enum BetStatus {
        betTime,
        VoteTime,
        CountTime,
        VoteEnded
    }

    struct Bet {
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

    //address public betWaveDAOAddress;

    event newBet(address, string, string);
    event startValidation(address);
    //event newUser(address, uint256);
    event startCount(address);
    //event voteRejected(uint256);

    BetWaveDAO betWaveDAO;

    address public lastSimpleBetAddress;

    uint public test1;
    uint public test2;
    uint public test3;

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

    function deployNewBet(string memory _compName1, string memory _compName2)
    external
    doesUserExist
    {
        require(
            betWaveDAO.validatorNumber() >= betWaveDAO.validatorNumberRequired(),
            "not enough validator"
        );
        address contractAddress = address(
            new SimpleBet(
                _compName1,
                _compName2,
                address(this),
                address(betWaveDAO)));
        lastSimpleBetAddress = contractAddress;
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
            betList[_betAddress].betStatus = BetStatus.CountTime;
            emit startCount(_betAddress);
            tallyVote(_betAddress);
        }
    }

    function tallyVote(address _betAddress) internal
    //onlyOwner(_betAddress)
    //isCorrectStep(BetStatus.CountTime, _betAddress)
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
                feesOrchestrator(_betAddress, 0);
                test3 = address(SimpleBet(payable(_betAddress))).balance;
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
                feesOrchestrator(_betAddress, 1);
            }
        } else revert noWinner();
    }

    function feesOrchestrator(
        address _betAddress,
        uint256 _expectedValidatorResultId
    ) internal {
        SimpleBet(payable(_betAddress)).sendPlatfromAndCreatorFees(
            betWaveDAO.platformFees(),
            betWaveDAO.creatorFees(),
            betList[_betAddress].owner);
        test2 = address(SimpleBet(payable(_betAddress))).balance;
        uint256 rewardValidator = SimpleBet(payable(_betAddress)).calculateValidatorReward(betWaveDAO.validatorFees());
        test1 = rewardValidator;
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

                // betWaveDAO.validators[betList[_betAddress].validatorList[i]].strike++;
            }
        }
        SimpleBet(payable(_betAddress)).setFeesBooleanToTrue();
    }

    function sendEther(address _to, uint256 _amount) internal {
        (bool sent, bytes memory received) = payable(_to).call{value : _amount}(
            ""
        );
        require(sent, "Failed to send Ether");
    }

    receive() external payable {
        require(msg.value >= 5 * 1e4 wei, "you can't send less than 50k wei");
    }

    fallback() external payable {
        calledFallbackFun = "Fallback function is executed!";
    }
}
