// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract MockV3Aggregator {
    int256 public price;
    
    constructor(int256 _initialPrice) {
        price = _initialPrice;
    }
    
    function latestRoundData() public view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return (0, price, 0, 0, 0);
    }

    function setPrice(int256 _price) public {
        price = _price;
    }
}
