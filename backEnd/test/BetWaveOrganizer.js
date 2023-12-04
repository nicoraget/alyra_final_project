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
    await betWaveDAO.connect(user5).addUser();
    return {betWaveOrganizer, betWaveDAO, user1, user2, user3, user4, user5};
}

describe("BetWaveOrganizer", () => {
    describe("deployNewBet", () => {
        it("should fail if user don't exist", async () => {
            //GIVEN
            const [user1] = await ethers.getSigners();
            const BetWaveDAO = await ethers.getContractFactory("BetWaveDAO");
            const betWaveDAO = await BetWaveDAO.deploy();
            const BetWaveOrganizer = await ethers.getContractFactory("BetWaveOrganizer");
            const betWaveOrganizer = await BetWaveOrganizer.deploy(await betWaveDAO.getAddress());
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2)).to.be.revertedWithCustomError(betWaveOrganizer, 'notRegistered');
        });

        it("should fail if not enough validators", async () => {
            //GIVEN
            const [user1] = await ethers.getSigners();
            const BetWaveDAO = await ethers.getContractFactory("BetWaveDAO");
            const betWaveDAO = await BetWaveDAO.deploy();
            const BetWaveOrganizer = await ethers.getContractFactory("BetWaveOrganizer");
            const betWaveOrganizer = await BetWaveOrganizer.deploy(await betWaveDAO.getAddress());
            await betWaveDAO.connect(user1).addUser();
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2)).to.be.revertedWith("not enough validator");
        });

        it("should set comp 1 to betList", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const expectedCompName1 = "max verstappen";
            const compName2 = "charles leclerc";
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';


            //WHEN
            await betWaveOrganizer.connect(user1).deployNewBet(expectedCompName1, compName2);
            const {compName1} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            expect(compName1).to.equals(expectedCompName1);
        });

        it("should set comp 2 to betList", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const expectedCompName2 = "charles leclerc";
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';


            //WHEN
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, expectedCompName2);
            const {compName2} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            expect(compName2).to.equals(expectedCompName2);
        });

        it("should set bet owner", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';


            //WHEN
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const {owner} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            expect(owner).to.equals(user1.address);
        });

        it("should set bet owner", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const expectedBetStatus = 0n


            //WHEN
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const {betStatus} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            expect(betStatus).to.equals(expectedBetStatus);
        });

        it("should emit new bet event", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2))
                .to.emit(betWaveOrganizer, "newBet")
                .withArgs(simpleBetAddress, compName1, compName2);
        });
    });

    describe("startBetValidation", () => {
        it("should fail if user is not the bet owner", async () => {
            //GIVEN
            const {betWaveOrganizer, user1, user2} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user2).startBetValidation(simpleBetAddress)).to.be.revertedWithCustomError(betWaveOrganizer, 'notOwner');
        });

        it("should fail if status is not betTime", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress)).to.be.revertedWithCustomError(betWaveOrganizer, 'wrongStep');
        });

        it("should set bet status to vote time", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const expectedBetStatus = 1n


            //WHEN
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);
            const {betStatus} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            expect(betStatus).to.equals(expectedBetStatus);
        });

        it("should emit startValidation event", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress))
                .to.emit(betWaveOrganizer, "startValidation")
                .withArgs(simpleBetAddress);
        });
    });
    describe("setBetVote", () => {
        it("should fail if status is not voteTime", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 0;

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress)).to.be.revertedWithCustomError(betWaveOrganizer, 'wrongStep');
        });

        it("should fail if competitor don't exist", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 2;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress)

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress)).to.be.revertedWith('unexisting competitors');
        });

        it("should fail if you are not validator", async () => {
            //GIVEN
            const {betWaveOrganizer, user1, user5} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress)

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user5).setBetVote(compId, simpleBetAddress)).to.be.revertedWithCustomError(betWaveOrganizer, 'notValidator');
        });

        it("should increment comp1 vote count", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 0;
            const expectedCompVoteCount = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const {comp1VoteCount} = await betWaveOrganizer.betList(simpleBetAddress)

            //THEN
            expect(comp1VoteCount).to.equals(expectedCompVoteCount);
        });

        it("should increment vote count", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 0;
            const expectedVoteCount = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const {voteCount} = await betWaveOrganizer.betList(simpleBetAddress)

            //THEN
            expect(voteCount).to.equals(expectedVoteCount);
        });

        it("should set validator result to 0", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 0;
            const expectedValidatorsResult = 0;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const validatorsResult = await betWaveOrganizer.getBetValidatorsResult(simpleBetAddress);

            //THEN
            expect(validatorsResult).to.equals(expectedValidatorsResult);
        });

        it("should set validator address in list", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 0;
            const validatorId = 0;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const validatorAddress = await betWaveOrganizer.getvalidatorAddress(simpleBetAddress, validatorId);

            //THEN
            expect(validatorAddress).to.equals(user1.address);
        });

        it("should increment comp2 vote count", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 1;
            const expectedCompVoteCount = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const {comp2VoteCount} = await betWaveOrganizer.betList(simpleBetAddress)

            //THEN
            expect(comp2VoteCount).to.equals(expectedCompVoteCount);
        });

        it("should increment vote count", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 1;
            const expectedVoteCount = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const {voteCount} = await betWaveOrganizer.betList(simpleBetAddress)

            //THEN
            expect(voteCount).to.equals(expectedVoteCount);
        });

        it("should set validator result to 1", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 1;
            const expectedValidatorsResult = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const validatorsResult = await betWaveOrganizer.getBetValidatorsResult(simpleBetAddress);

            //THEN
            expect(validatorsResult).to.equals(expectedValidatorsResult);
        });

        it("should set validator result to 0", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 1;
            const validatorId = 0;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            const validatorAddress = await betWaveOrganizer.getvalidatorAddress(simpleBetAddress, validatorId);

            //THEN
            expect(validatorAddress).to.equals(user1.address);
        });

        it("should set bet status to count time if validator number required is reached", async () => {
            //GIVEN
            const {betWaveOrganizer, user1, user2, user3, user4} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const expectedBetStatus = 2n
            const compId = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user2).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user3).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user4).setBetVote(compId, simpleBetAddress);
            const {betStatus} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            expect(betStatus).to.equals(expectedBetStatus);
        });

        it("should emiot start count event when validator number is reached", async () => {
            //GIVEN
            const {betWaveOrganizer, user1, user2, user3, user4} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const expectedBetStatus = 2n
            const compId = 1;
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);

            //WHEN
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user2).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user3).setBetVote(compId, simpleBetAddress);
            const {betStatus} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            await expect(betWaveOrganizer.connect(user4).setBetVote(compId, simpleBetAddress))
                .to.emit(betWaveOrganizer, "startCount")
                .withArgs(simpleBetAddress);
        });
    });

    describe("tallyVote", () => {
        it("should fail if status is not count time", async () => {
            //GIVEN
            const {betWaveOrganizer, user1} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user1).tallyVote(simpleBetAddress)).to.be.revertedWithCustomError(betWaveOrganizer, 'wrongStep');
        });

        it("should fail if user is not the bet owner on tally vote", async () => {
            //GIVEN
            const {betWaveOrganizer, user1, user2} = await loadFixture(deployFixture);
            const comp1 = "max verstappen";
            const comp2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(comp1, comp2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';

            //WHEN
            //THEN
            await expect(betWaveOrganizer.connect(user2).tallyVote(simpleBetAddress)).to.be.revertedWithCustomError(betWaveOrganizer, 'notOwner');
        });

        /*it("should call sendPlatformAndCreatorFee", async () => {
            //GIVEN
            const {betWaveOrganizer, betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            const compName1 = "max verstappen";
            const compName2 = "charles leclerc";
            await betWaveOrganizer.connect(user1).deployNewBet(compName1, compName2);
            const simpleBetAddress = '0x94099942864EA81cCF197E9D71ac53310b1468D8';
            const compId = 0;
            const SimpleBet = await ethers.getContractFactory("SimpleBet");
            const simpleBet = await SimpleBet.attach(simpleBetAddress);
            console.log(simpleBet)
            await simpleBet.connect(user1).setbet(0,{ value: ethers.parseEther("2")});
            await betWaveOrganizer.connect(user1).startBetValidation(simpleBetAddress);
            await betWaveOrganizer.connect(user1).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user2).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user3).setBetVote(compId, simpleBetAddress);
            await betWaveOrganizer.connect(user4).setBetVote(compId, simpleBetAddress);
            const betWaveDaoBalance = await ethers.provider.getBalance(betWaveDAO);

            console.log(betWaveDaoBalance);
            //WHEN

            //await betWaveOrganizer.connect(user1).tallyVote(simpleBetAddress);


            //const {betStatus} = await betWaveOrganizer.betList(simpleBetAddress);

            //THEN
            //expect().to.equals();
        });*/


    });

});
