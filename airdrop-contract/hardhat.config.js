require("@nomiclabs/hardhat-ethers");
require("hardhat-abi-exporter");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    networks: {
        localhost: {
            url: "http://127.0.0.1:7545",
        },
    },
    solidity: "0.8.4",
    abiExporter: {
        path: "./abi",
        clear: true,
        flat: true,
        spacing: 2,
    },
};
