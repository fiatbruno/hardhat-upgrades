const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log(`Deploying Box with account: ${deployer}`)
    log(`----------------------------------------------------`)

    const box = deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.waitConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log(`Verify with block confirmations: ${network.config.verificationBlockConfirmations} ...... `)
        await verify(box.address, [])
    } 
}

