// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("Token0", "TK0") {
        _mint(msg.sender, 10000000 * 10**decimals());
    }
}
