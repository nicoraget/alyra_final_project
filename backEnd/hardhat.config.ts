require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  gasReporter: {
    enabled: false
  },
  networks: {
    hardhat: {
      accounts: {
        count: 10,
         accountsBalance: "100000000000000000000", // default value is 10000ETH in wei
      },
    },
  }
};