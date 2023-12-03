// SPDX-License-Identifier: MIT

pragma solidity ^0.8.21;

    error notValidator();

contract BetWaveDAO {

    string calledFallbackFun = "ta race";

    uint256 validatorNumberRequired = 4;
    uint256 platformFees = 150;
    uint256 creatorFees = 50;
    uint256 betQuorum = 75;
    uint256 DAOQuorum = 85;
    uint256 validatorFees = 10;
    uint256 public userNumber = 1;

    enum VoteType {
        PlatformFee,
        CreatorFees,
        BetQuorum,
        DAOQuorum,
        ValidatorNumberRequired
    }

    struct DAOVote {
        VoteType voteType;
        uint256 voteFor;
        uint256 voteAgainst;
        uint256 newValue;
        mapping(address => uint256) hasVoted;
    }

    struct User {
        address payable userAddress;
        bool isBlacklisted;
        uint256 strike;
    }

    mapping(uint256 => DAOVote) public DAOVoteList;
    mapping(address => User) public validators;
    mapping(uint256 => address) public userList;
    mapping(address => uint256) public userToId;

    uint256 validatorNumber;
    uint256 daoVoteNumber;

    event voteRejected(uint256);
    event newUser(address, uint256);

    modifier onlyValidator() {
        if (validators[msg.sender].userAddress != msg.sender)
            revert notValidator();
        _;
    }

    modifier doesUserExist() {
        require(userToId[msg.sender] != 0, "not registered");
        _;
    }

    function setDaoVote(uint256 _id, uint256 _option) public onlyValidator {
        require(DAOVoteList[_id].hasVoted[msg.sender] == 0, "already voted");
        if (_option == 1) {
            DAOVoteList[_id].voteFor++;
        } else if (_option == 2) {
            DAOVoteList[_id].voteAgainst++;
        }
        DAOVoteList[_id].hasVoted[msg.sender] = 1;
        if (((DAOVoteList[_id].voteFor * 100) / validatorNumber) >= DAOQuorum) {
            switchVoteType(
                DAOVoteList[_id].voteType,
                DAOVoteList[_id].newValue
            );
        } else if (
            ((DAOVoteList[_id].voteAgainst * 100) / validatorNumber) >=
            DAOQuorum
        ) {
            emit voteRejected(_id);
        }
    }

    function switchVoteType(VoteType _voteType, uint256 _newValue) internal {
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
        }
    }

    function addUser() external {
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
    }

    function sendEther(address _to, uint256 _amount) internal {
        (bool sent, bytes memory received) = payable(_to).call{value: _amount}(
            ""
        );
        require(sent, "Failed to send Ether");
    }

    function askDAOVote(VoteType _voteType, uint256 _amount)
    public
    onlyValidator
    {
        DAOVoteList[daoVoteNumber].voteType = _voteType;
        DAOVoteList[daoVoteNumber++].newValue = _amount;
    }

    receive() external payable {
        require(msg.value >= 5 * 1e4 wei, "you can't send less than 50k wei");
    }

    fallback() external payable {
        calledFallbackFun = "Fallback function is executed!";
    }

}
