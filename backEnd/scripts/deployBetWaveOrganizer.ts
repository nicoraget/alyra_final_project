import {ethers, network} from "hardhat";

export async function deployBetWaveOrganizer(betWaveDAOAddress) {
    console.log("[ BetWave Organizer deployement]");
    const betWaveOrganizer = await ethers.deployContract("BetWaveOrganizer");
    await betWaveOrganizer.waitForDeployment(betWaveDAOAddress);
    const {hash, blockNumber} = betWaveOrganizer.deploymentTransaction()!

    /* const [owner,voter2,voter3] = await ethers.getSigners();
     await contract.addVoter(voter2);
     await contract.addVoter(voter3);
     await contract.startProposalsRegistering();
     await contract.connect(voter2).addProposal('I am your father');
     await contract.connect(voter2).addProposal('You shall not pass');
     await contract.connect(voter2).addProposal('You were my brother');
     await contract.connect(voter2).addProposal('Dont try it');
     await contract.endProposalsRegistering();
     await contract.startVotingSession();
     await contract.connect(voter3).setVote(1);*/
    console.log(`betWaveDAO deployed on ${network.name}`);
    console.log("Contract Address :", betWaveOrganizer.target);
    console.log("Transaction Hash :", hash);
    console.log("Block number :", blockNumber);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployBetWaveOrganizer().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});