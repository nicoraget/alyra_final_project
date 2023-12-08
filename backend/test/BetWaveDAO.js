const {
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const {expect} = require("chai");
const {ethers} = require("hardhat");

async function deployFixture() {
    const [user1, user2, user3, user4] = await ethers.getSigners();
    const BetWaveDAO = await ethers.getContractFactory("BetWaveDAO");
    const betWaveDAO = await BetWaveDAO.deploy();
    return {betWaveDAO, user1, user2, user3, user4};
}

describe("BetWaveDAO", () => {
    describe("addUser", () => {
        it("should add user to userToId", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);

            //WHEN
            await betWaveDAO.connect(user1).addUser();
            const user1Id = await betWaveDAO.userToId(user1.address);

            //THEN
            await expect(user1Id).to.equals(1);
        });

        it("should add user to userList", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            const userNumber = 1;

            //WHEN
            await betWaveDAO.connect(user1).addUser();
            const user1InList = await betWaveDAO.userList(userNumber);

            //THEN
            await expect(user1InList).to.equals(user1.address);
        });

        it("should increment user number when add user", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            const userNumberExpected = 2;

            //WHEN
            await betWaveDAO.connect(user1).addUser();
            const userNumber = await betWaveDAO.userNumber();

            //THEN
            expect(userNumber).to.equals(userNumberExpected);
        });

        it("Should emit newUser event", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            const expectedUserNumber = 1;

            //THEN
            await expect(betWaveDAO.connect(user1).addUser())
                .to.emit(betWaveDAO, "newUser")
                .withArgs(user1.address, expectedUserNumber);
        });

        it("should fail if user already exist", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).addUser()).to.be.revertedWith('user already exist');
        });
    });

    describe("addValidator", () => {
        it("should send 1 ether to contract", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();

            //WHEN
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const contractBalance = await ethers.provider.getBalance(await betWaveDAO.getAddress());

            //THEN
            expect(contractBalance).to.equals(ethers.parseEther("1"));
        });

        it("should add validator address to list", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();

            //WHEN
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const {userAddress} = await betWaveDAO.validators(user1.address);

            //THEN
            expect(userAddress).to.equals(user1.address);
        });

        it("should increment validator number", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();

            //WHEN
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const expectedValidatorNumber = 1;
            const validatorNumber = await betWaveDAO.validatorNumber();

            //THEN
            expect(validatorNumber).to.equals(expectedValidatorNumber);
        });

        it("should fail if insufficient balance", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await user1.sendTransaction({to: user2, value: ethers.parseEther("98.9")});


            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")})).to.be.revertedWithCustomError(betWaveDAO, 'insufficientBalance');
        });

        it("should fail if not 1 ether is send", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("0.5")})).to.be.revertedWith('send 1 eth');
            await expect(betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1.5")})).to.be.revertedWith('send 1 eth');
        });

        it("should fail if you already are validator", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")})).to.be.revertedWith('You already are');
        });

        it("should fail if you are not user", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2} = await loadFixture(deployFixture);

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")})).to.be.revertedWithCustomError(betWaveDAO, "notRegistered");
        });

        it("Should emit newValidator event", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();

            //THEN
            await expect(betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")}))
                .to.emit(betWaveDAO, "newValidator")
                .withArgs(user1.address);
        });

    });

    describe("askDAOVote", () => {
        it("sould fail is you are not validator", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            const voteType = 0n;
            const newValue = 0;

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).askDAOVote(voteType, newValue)).to.be.revertedWithCustomError(betWaveDAO, "notValidator");
        });

        it("should set dao vote type and add it to vote list", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const expectedVoteType = 0n;
            const newValue = 50;
            const daoVoteNUmber = 0;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(expectedVoteType, newValue);
            const {voteType} = await betWaveDAO.DAOVoteList(daoVoteNUmber);

            //THEN
            expect(voteType).to.equals(expectedVoteType);
        });

        it("should set dao new value", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const expectedNewValue = 50;
            const daoVoteNUmber = 0;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            const {newValue} = await betWaveDAO.DAOVoteList(daoVoteNUmber);

            //THEN
            expect(newValue).to.equals(newValue);
        });

        it("should increment daoVoteNumber", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const NewValue = 50;
            const ExpectedDAOVoteNUmber = 1;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, NewValue);
            const daoVoteNumber = await betWaveDAO.daoVoteNumber();

            //THEN
            expect(daoVoteNumber).to.equals(ExpectedDAOVoteNUmber);
        });

        it("Should emit newDAOVote event", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const voteType = 0;
            const newValue = 10;

            //THEN
            await expect(betWaveDAO.connect(user1).askDAOVote(voteType,newValue))
                .to.emit(betWaveDAO, "newDAOVote")
                .withArgs(voteType,newValue);
        });

    });

    describe("setDAOVote", () => {

        it("sould fail is you are not validator", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            const id = 0;
            const option = 0;

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).setDaoVote(id, option)).to.be.revertedWithCustomError(betWaveDAO, "notValidator");
        });

        it("should increment voteFor if option == 1", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const NewValue = 50;
            const daoVoteId = 0;
            const daoVoteOption = 1;
            const expectedVoteFor = 1;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, NewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOption);
            const {voteFor} = await betWaveDAO.DAOVoteList(daoVoteId);

            //THEN
            expect(voteFor).to.equals(expectedVoteFor);
        });

        it("should increment voteAgainst if option == 2", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const NewValue = 50;
            const daoVoteId = 0;
            const daoVoteOption = 2;
            const expectedVoteFor = 1;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, NewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOption);
            const {voteAgainst} = await betWaveDAO.DAOVoteList(daoVoteId);

            //THEN
            expect(voteAgainst).to.equals(expectedVoteFor);
        });

        it("should set has voted to 1", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const NewValue = 50;
            const daoVoteId = 0;
            const daoVoteOption = 2;
            const expectedHasVoted = true;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, NewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOption);


            const hasVoted = await betWaveDAO.getDaoVoteHasVoted(daoVoteId);

            //THEN
            expect(hasVoted).to.equals(expectedHasVoted);
        });

        it("shouldfail if you have voted", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const NewValue = 50;
            const daoVoteId = 0;
            const daoVoteOption = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, NewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOption);

            //THEN
            await expect(betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOption)).to.be.revertedWith('already voted');
        });

        it("should set platform fees", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const VoteType = 0n;
            const expectedNewValue = 50;
            const daoVoteId = 0;
            const daoVoteOptionForUser123 = 1;
            const daoVoteOptionForUser4 = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user4).setDaoVote(daoVoteId, daoVoteOptionForUser4);
            const platformFees = await betWaveDAO.platformFees();

            //THEN
            expect(platformFees).to.equals(expectedNewValue);
        });

        it("should set creatorFees", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const VoteType = 1n;
            const expectedNewValue = 200;
            const daoVoteId = 0;
            const daoVoteOptionForUser123 = 1;
            const daoVoteOptionForUser4 = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user4).setDaoVote(daoVoteId, daoVoteOptionForUser4);
            const creatorFees = await betWaveDAO.creatorFees();

            //THEN
            expect(creatorFees).to.equals(expectedNewValue);
        });

        it("should set betQuorum", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const VoteType = 2n;
            const expectedNewValue = 50;
            const daoVoteId = 0;
            const daoVoteOptionForUser123 = 1;
            const daoVoteOptionForUser4 = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user4).setDaoVote(daoVoteId, daoVoteOptionForUser4);
            const betQuorum = await betWaveDAO.betQuorum();

            //THEN
            expect(betQuorum).to.equals(expectedNewValue);
        });

        it("should set DAOQuorum", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const VoteType = 3n;
            const expectedNewValue = 60;
            const daoVoteId = 0;
            const daoVoteOptionForUser123 = 1;
            const daoVoteOptionForUser4 = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user4).setDaoVote(daoVoteId, daoVoteOptionForUser4);
            const DAOQuorum = await betWaveDAO.DAOQuorum();

            //THEN
            expect(DAOQuorum).to.equals(expectedNewValue);
        });

        it("should set ValidatorNumberRequired", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const VoteType = 4n;
            const expectedNewValue = 15;
            const daoVoteId = 0;
            const daoVoteOptionForUser123 = 1;
            const daoVoteOptionForUser4 = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user4).setDaoVote(daoVoteId, daoVoteOptionForUser4);
            const DAOQuorum = await betWaveDAO.validatorNumberRequired();

            //THEN
            expect(DAOQuorum).to.equals(expectedNewValue);
        });

        it("should set validatorFees", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3, user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const VoteType = 5n;
            const expectedNewValue = 30;
            const daoVoteId = 0;
            const daoVoteOptionForUser123 = 1;
            const daoVoteOptionForUser4 = 2;

            //WHEN
            await betWaveDAO.connect(user1).askDAOVote(VoteType, expectedNewValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOptionForUser123);
            await betWaveDAO.connect(user4).setDaoVote(daoVoteId, daoVoteOptionForUser4);
            const DAOQuorum = await betWaveDAO.validatorFees();

            //THEN
            expect(DAOQuorum).to.equals(expectedNewValue);
        });

        it("Should emit setDAOVote event", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            const voteType = 0;
            const newValue = 10;
            const daoVoteId = 0;
            const daoVoteOption = 1;
            await betWaveDAO.connect(user1).askDAOVote(voteType, newValue);

            //THEN
            await expect(betWaveDAO.connect(user1).setDaoVote(daoVoteId,daoVoteOption))
                .to.emit(betWaveDAO, "setDAOVote")
                .withArgs(user1.address,daoVoteId,daoVoteOption);
        });

        it("Should emit voteRejected event", async () => {
            //GIVEN
            const {betWaveDAO, user1,user2,user3,user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const voteType = 0;
            const newValue = 10;
            const daoVoteId = 0;
            const daoVoteOption = 2;
            await betWaveDAO.connect(user1).askDAOVote(voteType, newValue);
            await betWaveDAO.connect(user1).setDaoVote(daoVoteId, daoVoteOption);
            await betWaveDAO.connect(user2).setDaoVote(daoVoteId, daoVoteOption);
            await betWaveDAO.connect(user3).setDaoVote(daoVoteId, daoVoteOption);

            //THEN
            await expect(betWaveDAO.connect(user4).setDaoVote(daoVoteId,daoVoteOption))
                .to.emit(betWaveDAO, "voteRejected")
                .withArgs(daoVoteId);
        });

    });

    describe("WithdrawFromValidators", () => {

        it("should fail if contract has less than 1 ether", async () => {
            //GIVEN
            const {betWaveDAO, user1} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user1).withdrawFromValidators()).to.be.revertedWithCustomError(betWaveDAO, 'insufficientBalance');
        });

        it("should fail if you are not validator", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2, user3} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});

            //WHEN
            //THEN
            await expect(betWaveDAO.connect(user3).withdrawFromValidators()).to.be.revertedWith('You are not validators');
        });

        it("should send 1 ether to sender", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});

            //WHEN
            const previousBalance = Math.trunc(ethers.formatEther(BigInt(await ethers.provider.getBalance(user1))));
            await betWaveDAO.connect(user1).withdrawFromValidators();
            const nextBalance = Math.trunc(ethers.formatEther(BigInt(await ethers.provider.getBalance(user1))));

            //THEN
            expect(nextBalance).to.equals(previousBalance +1);
        });

        it("should suppress validator address", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});

            //WHEN
            await betWaveDAO.connect(user1).withdrawFromValidators();
            const {userAddress} = await betWaveDAO.validators(user1.address);

            //THEN
            expect(userAddress).to.equals(0n);
        });

        it("should suppress validator address", async () => {
            //GIVEN
            const {betWaveDAO, user1, user2} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            const expectedValidatorNumber = 1;

            //WHEN
            await betWaveDAO.connect(user1).withdrawFromValidators();
            const validatorNumber = await betWaveDAO.validatorNumber();

            //THEN
            expect(validatorNumber).to.equals(expectedValidatorNumber);
        });

        it("Should emit voteRejected event", async () => {
            //GIVEN
            const {betWaveDAO, user1,user2,user3,user4} = await loadFixture(deployFixture);
            await betWaveDAO.connect(user1).addUser();
            await betWaveDAO.connect(user2).addUser();
            await betWaveDAO.connect(user3).addUser();
            await betWaveDAO.connect(user4).addUser();
            await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther("1")});
            await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther("1")});
            const expectedValidatorNumber = 3;

            //THEN
            await expect(betWaveDAO.connect(user4).withdrawFromValidators())
                .to.emit(betWaveDAO, "withdrawValidator")
                .withArgs(user4.address,expectedValidatorNumber);
        });

    });
});