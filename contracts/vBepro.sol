// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


interface IStake is IERC20 {
    function stake(uint256 _amount) external;
    function unstake(uint256 _share) external;
}

contract sBEPRO is {

    mapping(address => uint256) public stakes;
    mapping(address => address) public delegations;


    string public constant symbol = "vBEPRO";
    string public constant name = "Staked Bepro Network";
    uint8 public constant decimals = 18;
    uint256 public override totalSupply;
    uint256 private constant LOCK_TIME = 24 hours;


    constructor(IERC20 _token) public {
        token = _token;
    }

}