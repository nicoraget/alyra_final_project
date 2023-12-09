// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

pragma solidity ^0.8.21;

    error notValidator();
    error notRegistered();
    error insufficientBalance();

contract BetWaveDAO is ReentrancyGuard {

    uint8 public platformFees = 150;
    uint8 public creatorFees = 50;
    uint8 public betQuorum = 75;
    uint8 public DAOQuorum = 75;
    uint8 public validatorFees = 10;
    uint16 public validatorNumberRequired = 4;
    uint16 public validatorNumber;
    uint64 public userNumber = 1;
    uint64 public daoVoteNumber;

    enum VoteType {
        PlatformFee,
        CreatorFees,
        BetQuorum,
        DAOQuorum,
        ValidatorNumberRequired,
        ValidatorFees
    }

    struct DAOVote {
        VoteType voteType;
        uint256 voteFor;
        uint256 voteAgainst;
        uint8 newValue;
        bool voteEnded;
        mapping(address => bool) hasVoted;
    }

    struct User {
        address payable userAddress;
        bool isBlacklisted;
        uint256 strike;
    }

    mapping(uint64 => DAOVote) public DAOVoteList;
    mapping(address => User) public validators;
    mapping(uint64 => address) public userList;
    mapping(address => uint64) public userToId;


    event voteRejected(uint256);
    event newUser(address, uint256);
    event newValidator(address);
    event newDAOVote(VoteType, uint);
    event setDAOVote(address, uint, uint);
    event withdrawValidator(address, uint);

    modifier onlyValidator() {
        if (validators[msg.sender].userAddress != msg.sender)
            revert notValidator();
        _;
    }

    modifier doesUserExist() {
        if (userToId[msg.sender] == 0)
            revert notRegistered();
        _;
    }

    modifier hasBalance(address _address) {
        if (_address.balance <= 1 ether)
            revert insufficientBalance();
        _;
    }

    // GETTERS //
    function getDaoVoteHasVoted(uint64 _id) external view returns (bool){
        return DAOVoteList[_id].hasVoted[msg.sender];
    }

    function getDaoControlValue() external view returns (uint, uint, uint, uint, uint, uint) {
        return (validatorNumberRequired, platformFees, creatorFees, betQuorum, DAOQuorum, validatorFees);
    }

    // GETTERS //

    function addUser() external {
        require(userToId[msg.sender] == 0, "user already exist");
        userToId[msg.sender] = userNumber;
        userList[userNumber++] = payable(msg.sender);
        emit newUser(msg.sender, userNumber - 1);
    }

    function addValidators() public payable doesUserExist hasBalance(msg.sender) {
        require(msg.value >= 1 ether, "send 1 eth");
        require(
            validators[msg.sender].userAddress != msg.sender,
            "You already are"
        );
        sendEther(address(this), msg.value);
        validators[msg.sender].userAddress = payable(msg.sender);
        validatorNumber++;
        emit newValidator(msg.sender);
    }

    function askDAOVote(VoteType _voteType, uint8 _newValue)
    public
    onlyValidator
    {
        DAOVoteList[daoVoteNumber].voteType = _voteType;
        DAOVoteList[daoVoteNumber++].newValue = _newValue;
        emit newDAOVote(_voteType, _newValue);
    }

    function setDaoVote(uint64 _id, uint8 _option) public onlyValidator {
        require(DAOVoteList[_id].hasVoted[msg.sender] == false, "already voted");
        if (_option == 1) {
            DAOVoteList[_id].voteFor++;
        } else if (_option == 2) {
            DAOVoteList[_id].voteAgainst++;
        }
        DAOVoteList[_id].hasVoted[msg.sender] = true;
        emit setDAOVote(msg.sender, _id, _option);
        if (((DAOVoteList[_id].voteFor * 100) / validatorNumber) >= DAOQuorum) {
            switchVoteType(
                DAOVoteList[_id].voteType,
                DAOVoteList[_id].newValue
            );
            DAOVoteList[_id].voteEnded = true;
        } else if (
            ((DAOVoteList[_id].voteAgainst * 100) / validatorNumber) >=
            DAOQuorum
        ) {
            DAOVoteList[_id].voteEnded = true;
            emit voteRejected(_id);
        }
    }

    function withdrawFromValidators() external payable
    nonReentrant
    hasBalance(address(this)) {
        require(
            validators[msg.sender].userAddress == msg.sender,
            "You are not validators"
        );
        uint256 amount = 1e18;
        sendEther(msg.sender, amount);
        validators[msg.sender].userAddress = payable(0);
        validatorNumber--;
        emit withdrawValidator(msg.sender, validatorNumber);
    }

    function switchVoteType(VoteType _voteType, uint8 _newValue) internal {
        if (_voteType == VoteType.PlatformFee) {
            platformFees = _newValue;
        } else if (_voteType == VoteType.CreatorFees) {
            creatorFees = _newValue;
        } else if (_voteType == VoteType.BetQuorum) {
            betQuorum = _newValue;
        } else if (_voteType == VoteType.DAOQuorum) {
            DAOQuorum = _newValue;
        } else if (_voteType == VoteType.ValidatorNumberRequired) {
            validatorNumberRequired = _newValue;
        } else if (_voteType == VoteType.ValidatorFees) {
            validatorFees = _newValue;
        }
    }

    function sendEther(address _to, uint256 _amount) internal {
        (bool sent,bytes memory received) = payable(_to).call{value : _amount}(
            ""
        );
        require(sent, "Failed to send Ether");
    }

    receive() external payable {
        require(msg.value >= 5 * 1e4 wei, "you can't send less than 50k wei");
    }

    fallback() external payable {
        require(msg.data.length == 0, "No fallback desired");
    }

}
