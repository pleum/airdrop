// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract Airdrop is Context {
    IERC20 public token;

    uint256 public maxAmount = 10000000 * 10**18;
    uint256 public perUserAmount = 100 * 10**18;
    uint256 public currentAmount;

    mapping(address => bool) public claimed;

    event Dropped(address recipient, uint256 amount, uint256 date);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function claim() external {
        require(claimed[_msgSender()] == false, "claimed");
        require(currentAmount + perUserAmount <= maxAmount, "exceed");

        claimed[_msgSender()] = true;
        currentAmount += perUserAmount;

        token.transfer(_msgSender(), perUserAmount);

        emit Dropped(_msgSender(), perUserAmount, block.timestamp);
    }
}
