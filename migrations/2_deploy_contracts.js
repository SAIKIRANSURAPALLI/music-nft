const MusicNFT = artifacts.require("MusicNFT");
const MockV3Aggregator = artifacts.require("MockV3Aggregator");

module.exports = async function (deployer, network, accounts) {
  let priceFeedAddress;

  if (network === "intersect") {
    await deployer.deploy(MockV3Aggregator, 2000);
    const mockAggregator = await MockV3Aggregator.deployed();
    priceFeedAddress = mockAggregator.address;
  }

  await deployer.deploy(MusicNFT, priceFeedAddress);
};
