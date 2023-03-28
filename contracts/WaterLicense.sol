// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract WaterLicense is ERC721 {
    uint public tokenValue;
    address owner;
    bool public isLicenseApproved;
    constructor() ERC721("WaterLicense", "WL") {
        owner = msg.sender;
        tokenValue = 100;
        isLicenseApproved = false;
    }

    struct Voter {
        string name;
        string email;
        uint weight;
        bool canVote;
    }

    mapping(address => Voter) voters;
    uint totalVotes;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function registerVoter(address voter, uint weight) public onlyOwner {
        voters[voter].weight = weight;
        voters[voter].canVote = true;
    }

    function castVote(string memory name, string memory email) public returns(uint) {
        require(voters[msg.sender].canVote == true);
        voters[msg.sender].name = name;
        voters[msg.sender].email = email;
        totalVotes += voters[msg.sender].weight;

        if(totalVotes >= 3) {
            isLicenseApproved = true;
        }

        return totalVotes;
    }

    struct buyer {
        bool hasBought;
        uint rating;
    }

    mapping(address => buyer) buyers;

    function buyWater() public {
        buyers[msg.sender].hasBought = true;
    }

    function rating(address reviewer, uint rate) public {
        require(buyers[reviewer].hasBought == true);

        buyers[reviewer].rating = rate;
        if(rate >=3)
            tokenValue++;
        else
            tokenValue--;
    }

    function mint(uint256 tokenId) public onlyOwner {
		super._mint(msg.sender, tokenId);
	}

	function transferStar(address starOwner, address to, uint256 tokenId) public onlyOwner {
		safeTransferFrom(starOwner, to, tokenId);
	}

    function renewLicense(string memory name, string memory email) public onlyOwner{
        uint votes = castVote(name, email);

        if(votes >= 3)
            isLicenseApproved = true;
        else
            isLicenseApproved = false;
    }
}