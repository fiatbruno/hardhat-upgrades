const { developmentChains } = require("../helper-hardhat-config")

const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts() 

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : network.config.waitConfirmations

    log("----------------------------------------------------")
    
    console.log(`Error occuring here with deployer: ${deployer} \n args: ${[]}\n log: ${true}\n waitConfirmations: ${waitBlockConfirmations} `)

    const box = await deploy("BoxV2", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    console.log(`Error occuring 5`)

    // Be sure to check out the hardhat-deploy examples to use UUPS proxies!
    // https://github.com/wighawag/template-ethereum-contracts

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(box.address, [])
    }
    console.log(`Error occuring 6`)

    log("----------------------------------------------------")
}

module.exports.tags = ["all", "boxv2"]
