import {ethers, network} from "hardhat";

export async function deployBetWaveDAO() {
    console.log("[Deployement]");
    const betWaveDAO = await ethers.deployContract("BetWaveDAO");
    await betWaveDAO.waitForDeployment();
    const {hash, blockNumber} = betWaveDAO.deploymentTransaction()!

    console.log(`betWaveDAO deployed on ${network.name}`);
    console.log("Contract Address :", betWaveDAO.target);
    console.log("Transaction Hash :", hash);
    console.log("Block number :", blockNumber);
    const betWaveDAOAddress = betWaveDAO.target;
    const betWaveOrganizer = await ethers.deployContract("BetWaveOrganizer", [betWaveDAOAddress]);
    await betWaveOrganizer.waitForDeployment();
    console.log("Contract Address :", betWaveOrganizer.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployBetWaveDAO().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});