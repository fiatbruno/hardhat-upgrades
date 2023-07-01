// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


contract Box {
    uint256 internal value;

    event valueChanged(uint256 newValue);

    function store(uint256 newValue) public {
        value = newValue;
        emit valueChanged(newValue);
    }

    function retrieve() public view returns(uint256){
        return value;
    }

    function version() public pure returns(string memory){
        return "v1";
    }

}