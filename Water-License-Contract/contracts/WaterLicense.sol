// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract WaterLicense is ERC721 {
    uint public tokenValue;
    address payable public owner;
    bool public isLicenseApproved;
    uint totalVotes;
    uint tokenId;
    uint public waterQuality;
    uint accountBalance;
    address payable newOwner;
    constructor() payable ERC721("WaterLicense", "WL") {
        owner = payable(msg.sender);
        tokenValue = msg.value;
        isLicenseApproved = false;
        totalVotes = 0;
        state = phase.regPh;
        accountBalance = 0;
    }

    enum phase {regPh, votePh, donePh}
    phase public state = phase.donePh;

    struct Voter {
        uint weight;
        bool canVote;
        bool isApproved;
        uint waterQuality;
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

    modifier validPhase(phase curPhase) {
        require(state == curPhase);
        _;
    }

    function changePhase(phase ph) public onlyOwner {
        require(ph > state);
        state = ph;
    }

    function registerVoter(address voter, uint weight) public onlyOwner validPhase(phase.regPh) {
        voters[voter].weight = weight;
        voters[voter].canVote = true;
    }

    function castVote(bool approval, uint waterRating) public validPhase(phase.votePh) {
        require(voters[msg.sender].canVote == true);
        
        if(approval) {
            totalVotes += voters[msg.sender].weight;
        }

        displayApprovers.push(Voter(voters[msg.sender].weight, voters[msg.sender].canVote, approval, waterRating));

        if(totalVotes >= 3) {
            isLicenseApproved = true;
            for(uint i = 0; i < displayApprovers.length; i++) {
                waterQuality += displayApprovers[i].waterQuality;
            }
            waterQuality = waterQuality/displayApprovers.length;
        }
    }

    struct buyer {
        bool hasBought;
        uint rating;
    }

    mapping(address => buyer) buyers;

    function buyWater() public validLicense validPhase(phase.donePh) payable {
        require(msg.value > 0);
        accountBalance += msg.value;
        buyers[msg.sender].hasBought = true;
    }

    function rating(uint rate) public validPhase(phase.donePh) {
        require(buyers[msg.sender].hasBought == true);
        require(rate >= 1 && rate <= 5, "Rating must be between 1 and 5");

        buyers[msg.sender].rating = rate;
        if(rate >=3)
            tokenValue++;
        else
            tokenValue--;
    }

    function mintToken() public onlyOwner {
        tokenId = waterQuality;
		super._mint(owner, tokenId);
	}

    function setNewOwner(address payable toAddress) public onlyOwner {
        newOwner = toAddress;
        safeTransferFrom(owner, newOwner, tokenId); //transfer ownership of the token
        owner.transfer(address(this).balance);
        owner = newOwner;
    }

    function renewLicense() public onlyOwner {
        totalVotes = 0;
        isLicenseApproved = false;
        state = phase.regPh;
    }
}