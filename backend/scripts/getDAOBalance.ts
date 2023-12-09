import {ethers} from "hardhat";

export async function getDAOControlValue() {
    console.log("[ Interract with testNet]");

    const BetWaveDAO = await ethers.getContractFactory("BetWaveDAO");
    const betWaveDAO = await BetWaveDAO.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3");

    const contractBalance = await ethers.provider.getBalance(betWaveDAO);
    console.log("bet wave dao balance :" + contractBalance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getDAOControlValue().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});