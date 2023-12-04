// SPDX-License-Identifier: UNLICENSED

import "../contracts/BetWaveOrganizer.sol";
import "../contracts/BetWaveDAO.sol";

pragma solidity ^0.8.19;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

    error minimumBetAmount();
    error alreadyBet();
    error eventAlreadyStarted();
    error eventNotEnded();
    error feesNotPaid();
    error forbidden();

contract SimpleBet {
    string calledFallbackFun;

    //name of the bet
    string betName;

    struct Competitor {
        string name;
        uint256 odd;
        uint256 betNumber;
        uint256 betAmount;
    }

    struct Bettor {
        address payable bettorAddress;
        uint256 betId;
        uint256 bettingAmout;
        uint256 bettingReward;
    }

    struct Vote {
        uint256 Comp1VoteNumber;
        uint256 comp2VoteNumber;
    }

    BetWaveOrganizer betWaveOrganizer;
    BetWaveDAO betWaveDAO;

    uint256 public beginEventTimestamp;
    uint256 public endEventTimestamp;
    uint256 public totalBet;
    uint256 winnerId;
    uint256 winningCoefficient;

    mapping(uint256 => Competitor) public competitors;
    mapping(address => Bettor) public bettors;

    address public betWavesOrganizerAddress;
    address public betWaveDaoAddress;
    bool hasFeesBeenPaid;

    uint public test;

    constructor(
        string memory _compName1,
        string memory _compName2,
    // uint256 _beginEventTimestamp,
    // uint256 _endEventTimestamp,
        address _betWavesOrganizerAddress,
        address _betWaveDaoAddress
    ) payable {
        betWaveOrganizer = BetWaveOrganizer(payable(_betWavesOrganizerAddress));
        betWaveDAO = BetWaveDAO(payable(_betWaveDaoAddress));
        //beginEventTimestamp = _beginEventTimestamp;
        // endEventTimestamp = _endEventTimestamp;
        competitors[0].name = _compName1;
        competitors[1].name = _compName2;
        betWavesOrganizerAddress = _betWavesOrganizerAddress;
        betWaveDaoAddress = _betWaveDaoAddress;
    }

    modifier hasAmountBettor() {
        if (msg.sender.balance < msg.value) revert insufficientBalance();
        _;
    }

    modifier hasAmountContract() {
        if (address(this).balance <= 0) revert insufficientBalance();
        _;
    }

    modifier hasMinimumAmount() {
        if (msg.value <= 49 gwei) revert minimumBetAmount();
        _;
    }

    modifier hasAlreadyBet() {
        if (bettors[msg.sender].bettorAddress == msg.sender)
            revert alreadyBet();
        _;
    }

    modifier hasAllFeesBeenPaid() {
        if (!hasFeesBeenPaid) revert feesNotPaid();
        _;
    }

    modifier isAuthorized() {
        if (!(msg.sender == betWavesOrganizerAddress)) revert forbidden();
        _;
    }

    modifier isRegistered() {
        if (betWaveDAO.userToId(msg.sender) == 0)
            revert notRegistered();
        _;
    }

    modifier hasEventStarted() {
        if (block.timestamp >= beginEventTimestamp)
            revert eventAlreadyStarted();
        _;
    }

    modifier hasEventEnded() {
        if (block.timestamp >= endEventTimestamp) revert eventNotEnded();
        _;
    }


    function setBet(uint256 _betId)
    external
    payable
    hasAmountBettor
    hasMinimumAmount
    hasAlreadyBet
    isRegistered
        //hasEventStarted
    {
        //require(owner() != msg.sender,"owner cant bet");
        require(_betId <= 1, "competitor don't exist");
        sendEther(address(this), msg.value);
        totalBet++;
        competitors[_betId].betNumber++;
        competitors[_betId].betAmount = competitors[_betId].betAmount + msg.value;
        oddCalculator();
        updateBettor(_betId);
    }

    /*function setWinnerId(
        uint256 _winnerId //hasEventEnded
    ) public {
        winnerId = _winnerId;
    }*/

    function sendPlatfromAndCreatorFees(
        uint256 _plateformeFees,
        uint256 _creatorFees,
        address _ownerAddress//hasEventEnded
    ) public hasAmountContract isAuthorized {
        require(!hasFeesBeenPaid, "fee already paid");
        uint256 contractBalanceSnapshot = getContractBalance();
        uint256 amountToSendToPlaterform = contractBalanceSnapshot /
        _plateformeFees;
        uint256 amountToSendToOwner = contractBalanceSnapshot / _creatorFees;
        sendEther(betWaveDaoAddress, amountToSendToPlaterform);
        sendEther(_ownerAddress, amountToSendToOwner);
    }

    function calculateValidatorReward(uint _validatorFees)
    public
    //view
    hasAmountContract
    isAuthorized returns (uint)
    {
        return address(this).balance / _validatorFees;
    }

    function sendValidatorFees(address _validatorAddress, uint256 _validatorReward)
    public
    isAuthorized
    hasAmountContract
    {
        sendEther(_validatorAddress, _validatorReward);
        test = 2;
    }

    function setFeesBooleanToTrue() public isAuthorized {
        hasFeesBeenPaid = true;
        winningCoefficientCalculator();
    }

    // on the first time, user have to call to redeem money. that way we dont parse a potentially big array
    function redeemToBettor() public payable hasAllFeesBeenPaid {
        require(hasFeesBeenPaid, "pay platform fee first");
        require(bettors[msg.sender].betId == winnerId, "no gain");
        bettors[msg.sender].bettingReward =
        (bettors[msg.sender].bettingAmout * winningCoefficient) /
        100;
        sendEther(msg.sender, bettors[msg.sender].bettingReward);
    }

    function winningCoefficientCalculator() internal hasAllFeesBeenPaid {
        winningCoefficient =
        (address(this).balance * 100) /
        competitors[winnerId].betAmount;
    }

    function oddCalculator() internal {
        (competitors[0].odd = (competitors[0].betNumber * 100) / totalBet);
        (competitors[1].odd = (competitors[1].betNumber * 100) / totalBet);
    }

    function updateBettor(uint256 _betId) internal {
        bettors[msg.sender].bettorAddress = payable(msg.sender);
        bettors[msg.sender].betId = _betId;
        bettors[msg.sender].bettingAmout = msg.value;
    }

    function sendEther(address _to, uint256 _amount) internal {
        (bool sent, bytes memory received) = payable(_to).call{value : _amount}(
            ""
        );
        require(sent, "Failed to send Ether");
    }

    ////////////////// test function
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //////////////////// test function

    receive() external payable hasMinimumAmount {
        require(msg.value >= 5 * 1e4 wei, "you can't send less than 50k wei");
    }

    fallback() external payable {
        calledFallbackFun = "Fallback function is executed!";
    }
}

