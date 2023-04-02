// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract WaterLicense is ERC721 {
    uint public tokenValue;
    address owner;
    bool public isLicenseApproved;
    uint totalVotes;
    uint tokenId;
    uint public waterQuality;
    constructor() ERC721("WaterLicense", "WL") {
        owner = msg.sender;
        tokenValue = 100;
        isLicenseApproved = false;
        totalVotes = 0;
    }

    struct Voter {
        string name;
        string email;
        uint weight;
        bool canVote;
        bool isApproved;
    }

    mapping(address => Voter) voters;

    Voter[] public displayApprovers;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier validLicense() {
        require(isLicenseApproved == true);
        _;
    }

    function registerVoter(address voter, uint weight) public onlyOwner {
        voters[voter].weight = weight;
        voters[voter].canVote = true;
    }

    function castVote(string memory name, string memory email, bool approval, uint waterRating) public returns(uint) {
        require(voters[msg.sender].canVote == true);
        voters[msg.sender].name = name;
        voters[msg.sender].email = email;
        if(approval)
            totalVotes += voters[msg.sender].weight;

        waterQuality = waterRating;
        displayApprovers.push(Voter(name, email, voters[msg.sender].weight, voters[msg.sender].canVote, approval));

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

    function buyWater() public returns(address) validLicense {
        buyers[msg.sender].hasBought = true;
        return msg.sender;
    }

    function rating(address reviewer, uint rate) public {
        require(buyers[reviewer].hasBought == true);

        buyers[reviewer].rating = rate;
        if(rate >=3)
            tokenValue++;
        else
            tokenValue--;
    }

    function mintToken() public onlyOwner returns(address) {
        tokenId = waterQuality;
		super._mint(msg.sender, tokenId);
        return msg.sender;
	}

	function transferLicense(address fromAddress, address toAddress) public onlyOwner returns(address) {
		safeTransferFrom(fromAddress, toAddress, tokenId);
        owner = toAddress;
        return toAddress;
	}

    function renewLicense() public onlyOwner {
        totalVotes = 0;
        isLicenseApproved = true;
    }
}