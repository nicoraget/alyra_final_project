import {ethers} from "hardhat";

export async function getDAOControlValue() {
    console.log("[ Interract with testNet]");

    const BetWaveDAO = await ethers.getContractFactory("BetWaveDAO");
    const betWaveDAO = await BetWaveDAO.attach("0xD1B919bc45B6A877081fc64B0C5b5D6a2C73cEC6");
    const sepoliaValidatorNumberRequired = await betWaveDAO.validatorNumberRequired();
    //await betWaveDAO.addUser();
    const userId = await betWaveDAO.userToId("0x2a97395aC74F073eB8354a4ec1DAf0b408A08fC6");

    console.log("validator number required :" + sepoliaValidatorNumberRequired);
    console.log("userId :" + userId);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getDAOControlValue().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});