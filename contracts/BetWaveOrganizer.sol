import "../contracts/SimpleBet.sol";
import "../contracts/BetWaveDAO.sol";
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

    error noWinner();
    error notOwner();

//error notValidator();

contract BetWaveOrganizer {
    string calledFallbackFun = "ta race";

    /*uint256 validatorNumberRequired = 4;
    uint256 platformFees = 150;
    uint256 creatorFees = 50;
    uint256 betQuorum = 75;
    uint256 DAOQuorum = 85;
    uint256 validatorFees = 10;
    uint256 public userNumber = 1;*/

    /*enum VoteType {
        PlatformFee,
        CreatorFees,
        BetQuorum,
        DAOQuorum,
        ValidatorNumberRequired
    }*/

    enum BetStatus {
        betTime,
        VoteTime,
        CountTime,
        VoteEnded
    }

    struct Bet {
        uint256 validationNumber;
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

    /*struct User {
        address payable userAddress;
        bool isBlacklisted;
        uint256 strike;
    }*/

    /*struct DAOVote {
        VoteType voteType;
        uint256 voteFor;
        uint256 voteAgainst;
        uint256 newValue;
        mapping(address => uint256) hasVoted;
    }*/

    address payable platformAddress =
    payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);

    mapping(address => Bet) public betList;
    /*mapping(uint256 => address) public userList;
    mapping(address => uint256) public userToId;
    mapping(uint256 => DAOVote) public DAOVoteList;

    mapping(address => User) public validators;

    uint256 validatorNumber;
    uint256 daoVoteNumber;*/

    address betWaveDAOAddress;

    event newBet(address, string, string);
    event startValidation(address);
    //event newUser(address, uint256);
    event startCount(address);
    //event voteRejected(uint256);

    BetWaveDAO betWaveDAO;

    modifier doesUserExist() {
        require(betWaveDAO.userToId(msg.sender) != 0, "not registered");
        _;
    }

    modifier onlyOwner(address _betAddress) {
        if (betList[_betAddress].owner != msg.sender) revert notOwner();
        _;
    }

    /*modifier onlyValidator() {
        if (validators[msg.sender].userAddress != msg.sender)
            revert notValidator();
        _;
    }*/

    constructor(address _betWaveDAOAddress) payable {
    betWaveDAO = BetWaveDAO(payable(_betWaveDAOAddress));
    }

    /*function addUser() external {
        require(userToId[msg.sender] == 0, "user already exist");
        userToId[msg.sender] = userNumber;
        userList[userNumber++] = payable(msg.sender);
        emit newUser(msg.sender, userNumber - 1);
    }

    function addValidators() public payable doesUserExist {
        require(msg.sender.balance > 1 ether, "insufficient balance");
        require(msg.value == 1 ether, "send 1 eth");
        require(
            validators[msg.sender].userAddress != msg.sender,
            "You already are"
        );
        sendEther(address(this), msg.value);
        validators[msg.sender].userAddress = payable(msg.sender);
        validatorNumber++;
    }

    function withdrawFromValidators() public payable {
        require(address(this).balance >= 1 ether, "insufficient balance");
        require(
            validators[msg.sender].userAddress == msg.sender,
            "You are not validators"
        );
        uint256 amount = 1e18;
        sendEther(msg.sender, amount);
        validators[msg.sender].userAddress = payable(0);
        validatorNumber--;
    }*/

    function DeployNewBet(string memory _compName1, string memory _compName2)
    external
    doesUserExist
    {
        require(
            betWaveDAO.validatorNumber >= betWaveDAO.validatorNumberRequired,
            "not enough validator"
        );
        address contractAddress = address(
            new SimpleBet(
            //msg.sender,
                _compName1,
                _compName2,
                platformAddress,
                address(this)
            )
        );
        betList[contractAddress].compName1 = _compName1;
        betList[contractAddress].compName2 = _compName2;
        betList[contractAddress].owner = msg.sender;
        betList[contractAddress].betStatus = BetStatus.betTime;
        emit newBet(contractAddress, _compName1, _compName2);
    }

    function startBetValidation(address _betAddress)
    external
    onlyOwner(_betAddress)
    {
        require(
            betList[_betAddress].betStatus == BetStatus.betTime,
            "wrong step"
        );
        betList[_betAddress].betStatus = BetStatus.VoteTime;
        emit startValidation(_betAddress);
    }

    function setBetVote(uint256 _compId, address _betAddress) public {
        require(
            betList[_betAddress].betStatus == BetStatus.VoteTime,
            "Can't vote yet"
        );
        require(_compId < 2, "unexisting competitors");
        require(
            betWaveDAO(payable(betWaveDAOAddress)).validators[msg.sender].userAddress == msg.sender,
            "You can't validate"
        );
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
        if (betList[_betAddress].voteCount >= betWaveDAO(payable(betWaveDAOAddress)).validatorNumberRequired) {
            betList[_betAddress].betStatus = BetStatus.CountTime;
            emit startCount(_betAddress);
        }
    }

    function tallyVote(address _betAddress) external onlyOwner(_betAddress) {
        require(
            betList[_betAddress].betStatus == BetStatus.CountTime,
            "cant count vote"
        );
        uint256 winnerId;
        if (
            betList[_betAddress].comp1VoteCount >
            betList[_betAddress].comp2VoteCount
        ) {
            //check if quorum is reached
            if (
                (betList[_betAddress].comp1VoteCount * 100) /
                betList[_betAddress].voteCount >=
                betWaveDAO(payable(betWaveDAOAddress)).betQuorum
            ) {
                feesOrchestrator(_betAddress, 0);
            }
        } else if (
            betList[_betAddress].comp1VoteCount <
            betList[_betAddress].comp2VoteCount
        ) {
            //check if quorum is reached
            if (
                (betList[_betAddress].comp2VoteCount * 100) /
                betList[_betAddress].voteCount >=
                betWaveDAO(payable(betWaveDAOAddress)).betQuorum
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
            betWaveDAO(payable(betWaveDAOAddress)).platformFees,
            betWaveDAO(payable(betWaveDAOAddress)).creatorFees
        );
        uint256 rewardValidator = SimpleBet(payable(_betAddress))
        .calculateValidatorReward(betWaveDAO(payable(betWaveDAOAddress)).validatorFees);
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
                betWaveDAO(payable(betWaveDAOAddress)).validators[betList[_betAddress].validatorList[i]].strike++;
            }
        }
        SimpleBet(payable(_betAddress)).setFeesBooleanToTrue();
    }

    function sendEther(address _to, uint256 _amount) internal {
        (bool sent, bytes memory received) = payable(_to).call{value: _amount}(
            ""
        );
        require(sent, "Failed to send Ether");
    }

    /*function askDAOVote(VoteType _voteType, uint256 _amount)
        public
        onlyValidator
    {
        DAOVoteList[daoVoteNumber].voteType = _voteType;
        DAOVoteList[daoVoteNumber++].newValue = _amount;
    }*/

    receive() external payable {
        require(msg.value >= 5 * 1e4 wei, "you can't send less than 50k wei");
    }

    fallback() external payable {
        calledFallbackFun = "Fallback function is executed!";
    }
}
