import {ethers, network} from "hardhat";

export async function deployBetWaveDAO() {
    console.log("[Deployement]");
    const [user1, user2, user3,user4,user5] = await ethers.getSigners();
    const betWaveDAO = await ethers.deployContract("BetWaveDAO");
    await betWaveDAO.waitForDeployment();
    const {hash, blockNumber} = betWaveDAO.deploymentTransaction()!
    console.log(`betWaveDAO deployed on ${network.name}`);
    console.log("Contract Address :", betWaveDAO.target);
    console.log("Transaction Hash :", hash);
    console.log("Block number :", blockNumber);
    await betWaveDAO.connect(user1).addUser();
    await betWaveDAO.connect(user2).addUser();
    await betWaveDAO.connect(user3).addUser();
    await betWaveDAO.connect(user4).addUser();
    await betWaveDAO.connect(user5).addUser();
    await betWaveDAO.connect(user1).addValidators({value: ethers.parseEther('1')});
    await betWaveDAO.connect(user2).addValidators({value: ethers.parseEther('1')});
    await betWaveDAO.connect(user3).addValidators({value: ethers.parseEther('1')});
    await betWaveDAO.connect(user4).addValidators({value: ethers.parseEther('1')});
    await betWaveDAO.connect(user5).addValidators({value: ethers.parseEther('1')});

    const betWaveDAOAddress = betWaveDAO.target;
    const betWaveOrganizer = await ethers.deployContract("BetWaveOrganizer", [betWaveDAOAddress]);
    const {hash2, blockNumber2} = betWaveDAO.deploymentTransaction()!
    console.log(`betWaveDAO deployed on ${network.name}`);
    console.log("Contract Address :", betWaveOrganizer.target);
    console.log("Transaction Hash :", hash2);
    console.log("Block number :", blockNumber2);
    await betWaveOrganizer.connect(user1).deployNewBet('max','charles');
    const SimpleBet1 = await ethers.getContractFactory("SimpleBet");
    const simpleBet1 = await SimpleBet1.attach(await betWaveOrganizer.lastSimpleBetAddress());

    await betWaveOrganizer.connect(user1).deployNewBet('charles', 'kimi');
    const SimpleBet2= await ethers.getContractFactory("SimpleBet");
    const simpleBet2 = await SimpleBet2.attach(await betWaveOrganizer.lastSimpleBetAddress());

    simpleBet2.connect(user2).setBet(1,{value: ethers.parseEther('2')});
    simpleBet2.connect(user2).setBet(1,{value: ethers.parseEther('2')});
    simpleBet2.connect(user3).setBet(1,{value: ethers.parseEther('2')});
    simpleBet2.connect(user4).setBet(0,{value: ethers.parseEther('25')});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployBetWaveDAO().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});