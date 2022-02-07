// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StackingERC20 is ERC20{
    constructor() ERC20("Task3","T3"){
        _mint(msg.sender,(1000000 * (10 ** 18)));
    }

    function mint(uint256 token) public {
        _mint(msg.sender,(token * (10 ** 18)));
    }
}

contract stackingCoin {
    ERC20 token;
    // block
    mapping(address => uint256) stackingtokens;
    mapping(address => uint256) stackingtime;
    constructor(ERC20 _token){
        token = _token;
    }

    uint256 public minimum = 1 * (10 ** 18);
    event getBalance(uint256 balance,uint256 amount);
    function stackingToken(uint256 amount) public {
        require(minimum < (amount * (10 ** 18)),"amount is Less then stacking amount");
        require(token.balanceOf(msg.sender)>= (amount * (10 ** 18)),"insuffent fund");
        require(token.allowance(msg.sender, address(this)) >= (amount * (10 ** 18)),"Please increse allowance");
        emit getBalance(token.balanceOf(msg.sender)/(10 ** 18),amount);
        stackingtokens[msg.sender] = amount * (10 ** 18);
        stackingtime[msg.sender] = block.timestamp;
        token.transferFrom(msg.sender,address(this),(amount * (10 ** 18)));
    }

    function withdrawal() public {
        uint256 totaltime = block.timestamp - stackingtime[msg.sender];
        require(totaltime >= 3600,"minimum stacking time is 1 hour");
        uint256 reword = ((((totaltime / 3600) * 5) * stackingtokens[msg.sender])/100) + stackingtokens[msg.sender];
        // uint256 reword =  (((1*5) * stackingtokens[msg.sender])/100) + stackingtokens[msg.sender];
        token.transfer(msg.sender,reword);
    }
}