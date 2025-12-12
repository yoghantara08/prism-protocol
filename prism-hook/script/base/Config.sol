// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IHooks} from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";

/// @notice Shared configuration between scripts
contract Config {
    /// @dev populated with default anvil addresses
    IERC20 constant token0 =
        IERC20(address(0x0F4Fa7Dc4d2A69dE0Be5b5E3A6923ddce1a7Dc2a)); // USDT
    IERC20 constant token1 =
        IERC20(address(0x68C47CEAD9A67E27f84BDb058FCaB747d2F2e0C3)); // USDC
    IHooks constant hookContract =
        IHooks(address(0xa6dFcd431EEc8dAd05B104D6Aaa381900dF1c080)); // PrismHook

    Currency constant currency0 = Currency.wrap(address(token0));
    Currency constant currency1 = Currency.wrap(address(token1));
}
