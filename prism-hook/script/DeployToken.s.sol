// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {Token} from "../src/Token.sol";

contract DeployToken is Script {
    function setUp() public {}

    function run() public returns (Token tokenA, Token tokenB) {
        vm.startBroadcast();
        tokenA = new Token("USDC", "USDC");
        tokenB = new Token("USDT", "USDT");

        tokenA.mint(1e25);
        tokenB.mint(1e25);
        vm.stopBroadcast();
    }
}
