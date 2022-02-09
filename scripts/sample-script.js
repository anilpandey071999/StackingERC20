// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const LPToken = await hre.ethers.getContractFactory("StackingERC20");
  const LP_Token = await LPToken.deploy();
  await LP_Token.deployed();
  console.log("Greeter deployed to:", LP_Token.address);

  const StackingContract = await hre.ethers.getContractFactory("stackingCoin");
  const stackingContract = await StackingContract.deploy(LP_Token.address);
  await stackingContract.deployed();
  console.log("Greeter deployed to:", stackingContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
