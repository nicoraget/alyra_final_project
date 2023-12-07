require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv/config");
require("@nomicfoundation/hardhat-verify");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.21",
    gasReporter: {
        enabled: false
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            accounts: {
                count: 10,
                accountsBalance: "100000000000000000000", // default value is 10000ETH in wei
            },
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [`0x${PRIVATE_KEY}`],
            chainId: 11155111,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    },
};