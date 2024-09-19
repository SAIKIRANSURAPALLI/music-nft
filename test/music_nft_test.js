const MusicNFT = artifacts.require("MusicNFT");

contract("MusicNFT", (accounts) => {
  let musicNftInstance;
  const creator = accounts[0];
  const buyer = accounts[1];
  const tokenURI = "https://example.com/nft";

  before(async () => {
    musicNftInstance = await MusicNFT.deployed();
  });

  it("should create and mint a new MusicNFT", async () => {
    const result = await musicNftInstance.createNFT(tokenURI, {
      from: creator,
    });
    const tokenId = result.logs[0].args.tokenId.toString();
    const owner = await musicNftInstance.ownerOf(tokenId);

    assert.equal(owner, creator, "The owner of the NFT should be the creator");
  });

  it("should list the NFT for sale and allow purchase", async () => {
    const result = await musicNftInstance.createNFT(tokenURI, {
      from: creator,
    });
    const tokenId = result.logs[0].args.tokenId.toString();

    await musicNftInstance.listNFTForSale(
      tokenId,
      web3.utils.toWei("1", "ether"),
      { from: creator }
    );

    // Buyer should be able to buy the NFT after listing
    await musicNftInstance.buyNFT(tokenId, {
      from: buyer,
      value: web3.utils.toWei("1", "ether"),
    });

    const newOwner = await musicNftInstance.ownerOf(tokenId);
    assert.equal(newOwner, buyer, "The owner of the NFT should be the buyer");
  });
});
