const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContractFactory("BoxProxyAdmin")
    const transparentProxy = await ethers.getContractFactory("Box_Proxy")

    const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
    const versionV1 = await proxyBoxV1.version()
    console.log("Box version:", versionV1)

    const boxV2 = await ethers.getContractFactory("BoxV2")
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
    await upgradeTx.wait(1 )

    console.log("Box upgraded")

    const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
    const versionV2 = await proxyBoxV2.version()
    console.log("Box version:", versionV2)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
