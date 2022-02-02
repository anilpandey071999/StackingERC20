// SPDX-License-Identifier: MIT

// ["year","electricity","apple"]
// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Task2 is ERC20{
    address owner;
    address[] delegate;

    constructor(address _owners,uint256 _initialSupply) ERC20("Ka","k"){
        owner = _owners;
        _mint(owner,(_initialSupply * (10 ** 18)));
    }

    function addDelegate(address _delegateAccount1,address _delegateAccount2)public{
        require(msg.sender == owner,"only owner can call this function");
        approve(_delegateAccount1,1000 * (10 ** 18));
        approve(_delegateAccount2,100000 * (10 ** 18));
        delegate.push(_delegateAccount1);
        delegate.push(_delegateAccount2);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {
        _transfer(sender, recipient, amount);

        uint256 currentAllowance = _allowances[sender][delegate[0]];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        unchecked {
            _approve(sender, delegate[0], currentAllowance - amount);
        }

        return true;
    }

    function trimStringMirroringChars(string[] memory data) public  returns (string memory) {
        for(uint256 i = data.length - 1 ; i > 0 ; i--){

            bytes[] memory d = new bytes[](2);
            d = op(bytes(data[i-1]),bytes(data[i]));
            if(d.length == 2){
                data[i] = string(d[1]);
                data[i - 1] = string(d[0]);
            }else{
                if(d.length == 1){
                    data[i - 1] = string(d[0]);
                    delete data[i];
                }else{
                    delete data[i];
                    delete data[i - 1];
                }
            }
           
        }
        // bytes memory strings = bytes(concadination(data)); 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        uint256 x = 0;
        if(data.length != 0){
            x = bytes(concadination(data)).length;
        }
        if(x>=0 || x<=5){
            transferFrom(owner,msg.sender,(100 * (10 ** 18)));
        }else{
            transferFrom(owner,msg.sender,(1000 * (10 ** 18)));
        }
        return concadination(data);
    }

    function op(bytes memory a, bytes memory b)internal pure returns(bytes[] memory){
        uint c = 0;
        uint z = 0;
        bytes memory temp1 = new bytes(a.length);
        bytes memory temp2 = new bytes(b.length);
        if(a.length > b.length){
            c = a.length;
        }else{
            c = b.length;
        }
        z = b.length - 1;

        uint count1;
        uint count2;
        uint count0 = 0;
        for(uint256 j = 0; j < c; j++){
            if(j <= (bytes(a).length - 1) ){
                if(bytes(a)[j] != bytes(b)[z]){
                    if(j < a.length){
                        temp1[count1++] = bytes(a)[j];
                    }
                    if(z >= 0 && count0 == 0){
                        temp2[count2++] = bytes(b)[z];
                    }
                    if(z == 0){
                       count0 = count0 + 1;
                    }   
                }
            }else{
                if(z >= 0 && count0 == 0){
                    temp2[count2++] = bytes(b)[z];
                }
                if(z == 0){
                       count0 = count0 + 1;
                }
            }
            if(z == 0){
               count0 = count0 + 1;
            }
            if(z > 0){
                z = z - 1;
            }
            
        }
        bytes[] memory d =  new bytes[](2);
        bytes memory checkLen0 = removeWhite(temp1);
        bytes memory checkLen1 = removeWhite(temp2);
        if(checkLen0.length != 0 && checkLen1.length != 0 ){
            d[0] = checkLen0;
            d[1] = reverse(checkLen1);
        }else{
            if(checkLen0.length == 0){
                d[0] = reverse(checkLen1);
            }
            if(checkLen1.length == 0){
                d[0] = checkLen0;
            }
        }

        return d;
    }
    
    function removeWhite(bytes memory a) internal pure returns(bytes memory){
        uint256 q = 0;
        for(uint256 i = 0; i < a.length - 1; i++){
            if(a[i] != 0x00){
                q++;
            }
        }
        bytes memory k = new bytes(q);
        uint256 count;
        for(uint256 i = 0; i < a.length - 1; i++){
            if(a[i] != 0x00){
                k[count++] = a[i];
            }
        }
        return k;
    }

    function reverse(bytes memory a) internal pure returns(bytes memory){
        uint count;
            bytes memory temp = new bytes(a.length);
            uint k = a.length - 1;
            // bool c = false;
            for(k ; k >= 0; k--){
                temp[count++] = a[k];
                if(k==0){
                    break;
                }
            }
            return temp;
    }

    function concadination(string[] memory data) internal pure returns (string memory){
        bytes memory temp = new bytes(2000);
        uint count;
        for(uint i = data.length - 1; i >= 0; i--){
            for(uint j =0 ; j < bytes(data[i]).length ; j++){
                temp[count++] = bytes(data[i])[j];
            }
            if(i==0){
                break;
            }
        }
        return string(temp);
    }


}