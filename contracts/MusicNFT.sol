// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MusicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    AggregatorV3Interface internal priceFeed;

    // Track ownership shares per NFT
    mapping(uint256 => address[]) public trackOwners;
    mapping(uint256 => mapping(address => uint256)) public trackShares;

    constructor(address _priceFeed) ERC721("MusicNFT", "MNFT") {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    // Create a new music NFT
    function createNFT(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        trackOwners[newItemId].push(msg.sender);
        trackShares[newItemId][msg.sender] = 100; // 100% ownership to creator
        return newItemId;
    }

    // Get the latest price from Chainlink price feed
    function getLatestPrice() public view returns (int) {
        (, int price, , ,) = priceFeed.latestRoundData();
        return price;
    }

    // Transfer a portion of ownership shares to another address
    function transferShares(uint256 tokenId, address to, uint256 shares) public {
        require(trackShares[tokenId][msg.sender] >= shares, "Not enough shares to transfer");
        require(to != address(0), "Invalid recipient address");

        // Deduct shares from the sender
        trackShares[tokenId][msg.sender] -= shares;

        // If the recipient doesn't already own shares, add them to the owners array
        if (trackShares[tokenId][to] == 0) {
            trackOwners[tokenId].push(to);
        }

        // Add shares to the recipient
        trackShares[tokenId][to] += shares;

        // Optional: Emit event for share transfer (add TransferShares event)
    }

    // Combine two NFTs into a new one (for unique creations from multiple tracks)
    function combineNFTs(uint256 tokenId1, uint256 tokenId2, string memory newTokenURI) public returns (uint256) {
        // Require the caller to own both NFTs entirely (100% ownership of both)
        require(trackShares[tokenId1][msg.sender] == 100, "Must own 100% of tokenId1");
        require(trackShares[tokenId2][msg.sender] == 100, "Must own 100% of tokenId2");

        // Burn both old NFTs
        _burn(tokenId1);
        _burn(tokenId2);

        // Create a new combined NFT
        uint256 newItemId = createNFT(newTokenURI);
        
        // Optional: Emit event for combination
        return newItemId;
    }

    // Get the list of owners for a given tokenId
    function getOwners(uint256 tokenId) public view returns (address[] memory) {
        return trackOwners[tokenId];
    }

    // Get the share percentage of a specific owner for a given tokenId
    function getOwnerShares(uint256 tokenId, address owner) public view returns (uint256) {
        return trackShares[tokenId][owner];
    }

    // Event for share transfers
    event TransferShares(uint256 indexed tokenId, address indexed from, address indexed to, uint256 shares);
}
