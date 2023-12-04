const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {expect} = require("chai");
const {ethers} = require("hardhat");

async function deployFixture() {
    const [user1, user2, user3, user4, user5] = await ethers.getSigners();
    const BetWaveDAO = await ethers.getContractFactory("BetWaveDAO");
    const betWaveDAO = await BetWaveDAO.deploy();
    const BetWaveOrganizer = await ethers.getContractFactory("BetWaveOrganizer");
    const betWaveOrganizer = await BetWaveOrganizer.deploy(await betWaveDAO.getAddress());
    await betWaveDAO.connect(user1).addUser();
    await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
    await betWaveDAO.connect(user2).addUser();
    await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
    await betWaveDAO.connect(user3).addUser();
    await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
    await betWaveDAO.connect(user4).addUser();
    await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
    const SimpleBet = await ethers.getContractFactory("SimpleBet");
    const simpleBet = await SimpleBet.deploy(
        "max verstappen",
        "kimi raikonnen",
        await betWaveOrganizer.getAddress(),
        await betWaveDAO.getAddress());
    //await betWaveOrganizer.connect(user1).deployNewBet("max verstappen" , "kimi raikonnen");
    /*const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
    const SimpleBet = await ethers.getContractFactory("SimpleBet");
    const simpleBet = await SimpleBet.attach(simpleBetAddress);*/
    return {betWaveOrganizer, betWaveDAO, simpleBet, user1, user2, user3, user4, user5};
}

describe("SimpleBet", () => {
    describe("deploy", () => {
        it("should create betWaveOrganizer instance", async () => {
            //GIVEN
            //WHEN
            const {simpleBet, betWaveOrganizer} = await loadFixture(deployFixture);

            //THEN
            expect(await simpleBet.betWavesOrganizerAddress()).to.equals(await betWaveOrganizer.getAddress());
        });

        it("should create betWaveDAO instance", async () => {
            //GIVEN
            //WHEN
            const {simpleBet, betWaveDAO} = await loadFixture(deployFixture);

            //THEN
            expect(await simpleBet.betWaveDaoAddress()).to.equals(await betWaveDAO.getAddress());
        });

        it("should set competitor 1 name", async () => {
            //GIVEN
            const compId = 0;
            const expectedCompName1 = "max verstappen";

            //WHEN
            const {simpleBet} = await loadFixture(deployFixture);
            const {name} = await simpleBet.competitors(compId);

            //THEN
            expect(name).to.equals(expectedCompName1);
        });

        it("should set competitor 2 name", async () => {
            //GIVEN
            const compId = 1;
            const expectedCompName2 = "kimi raikonnen";

            //WHEN
            const {simpleBet} = await loadFixture(deployFixture);
            const {name} = await simpleBet.competitors(compId);

            //THEN
            expect(name).to.equals(expectedCompName2);
        });
    });

    describe("setBet", () => {
        /* it("should fail if bettor amount is insufficient", async () => {
             //GIVEN
             const {simpleBet, user1} = await loadFixture(deployFixture);
             const betId = 1;

             //WHEN
             //THEN
             await expect(simpleBet.connect(user1).setBet(betId,{value: ethers.parseEther("100")})).to.be.revertedWithCustomError(simpleBet, 'insufficientBalance');
         });*/

        it("should fail if bettor amount is insufficient", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;

            //WHEN
            //THEN
            await expect(simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("0.000000000001")})).to.be.revertedWithCustomError(simpleBet, 'minimumBetAmount');
        });

        it("should fail if user already bet", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")})

            //THEN
            await expect(simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")})).to.be.revertedWithCustomError(simpleBet, 'alreadyBet');
        });

        it("should fail if user is not registered", async () => {
            //GIVEN
            const {simpleBet, user5} = await loadFixture(deployFixture);
            const betId = 1;

            //WHEN

            //THEN
            await expect(simpleBet.connect(user5).setBet(betId, {value: ethers.parseEther("1")})).to.be.revertedWithCustomError(simpleBet, 'notRegistered');
        });

        it("should fail if user is not registered", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 2;

            //WHEN

            //THEN
            await expect(simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")})).to.be.revertedWith('competitor don\'t exist');
        });

        it("should sent ether to contract", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;

            //WHEN
            const previousContractBalance = await ethers.provider.getBalance(simpleBet);
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const nextContractBalance = await ethers.provider.getBalance(simpleBet);

            //THEN
            expect(nextContractBalance).to.equals(previousContractBalance + ethers.parseEther("1"))
        });

        it("should increment total bet", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;
            const expectTotalBet = 1;

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const totalBet = await simpleBet.totalBet();

            //THEN
            expect(totalBet).to.equals(expectTotalBet);
        });

        it("should increment competitor bet number", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;
            const expectBetNumber = 1;

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const {betNumber} = await simpleBet.competitors(betId);

            //THEN
            expect(betNumber).to.equals(expectBetNumber);
        });

        it("should increment competitor bet amount", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;
            const expectBetAmount = ethers.parseEther("1");

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const {betAmount} = await simpleBet.competitors(betId);

            //THEN
            expect(betAmount).to.equals(expectBetAmount);
        });

        it("should calculate odd for comp 0", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const {odd} = await simpleBet.competitors(betId);

            //THEN
            expect(odd).to.equals(100);
        });

        it("should calculate odd for comp 1", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const {odd} = await simpleBet.competitors(0);
            //THEN
            expect(odd).to.equals(0);
        });

        it("should set bettor address to bettors list", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;
            const expectedAddress = await user1.getAddress();

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const {bettorAddress} = await simpleBet.bettors(expectedAddress);
            //THEN
            expect(bettorAddress).to.equals(expectedAddress);
        });

        it("should set bet id to bettors list", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const ExpectedbetId = 1;
            const userAddress = await user1.getAddress();

            //WHEN
            await simpleBet.connect(user1).setBet(ExpectedbetId, {value: ethers.parseEther("1")});
            const {betId} = await simpleBet.bettors(userAddress);
            //THEN
            expect(betId).to.equals(ExpectedbetId);
        });

        it("should set bet amount to bettors list", async () => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;
            const userAddress = await user1.getAddress();
            const expectedBettingAMount = ethers.parseEther("1");

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("1")});
            const {bettingAmout} = await simpleBet.bettors(userAddress);
            //THEN
            expect(bettingAmout).to.equals(expectedBettingAMount);
        });
    });

    describe("sendPlatfromAndCreatorFees", () => {
        it("should fail if caller is not betWaveOrganizer", async() => {
            //GIVEN
            const {simpleBet, user1} = await loadFixture(deployFixture);
            const betId = 1;
            const platformFees = 150;
            const creatorFees = 50;

            //WHEN
            await simpleBet.connect(user1).setBet(betId, {value: ethers.parseEther("10")});

            //THEN
            await expect(simpleBet.connect(user1).sendPlatfromAndCreatorFees(platformFees,creatorFees)).to.be.revertedWithCustomError(simpleBet, 'forbidden');
        });

    });

});