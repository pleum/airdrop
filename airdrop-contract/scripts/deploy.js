async function main() {
    const [deployer] = await ethers.getSigners();
    const [address, balance] = await Promise.all([
        deployer.getAddress(),
        deployer.getBalance(),
    ]);

    console.log("Deploying the contracts with the account:", address);
    console.log("Account balance:", balance.toString());

    // Deploy token contract.
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    console.log("Token address:", token.address);

    // Deploy airdrop contract.
    const Airdrop = await ethers.getContractFactory("Airdrop");
    const airdrop = await Airdrop.deploy(token.address);
    await airdrop.deployed();

    console.log("Airdrop address:", airdrop.address);

    const amount = ethers.utils.parseEther("1000000");
    await token.transfer(airdrop.address, amount);

    const airdropTokenBalance = await token.balanceOf(airdrop.address);

    console.log(
        "Transfered token to airdrop address:",
        airdropTokenBalance.toString()
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
