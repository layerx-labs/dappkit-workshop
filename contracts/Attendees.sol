// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract Attendees {
    
    // Struct to hold attendee information
    struct Attendee {
        string name;
        string email;
        address wallet;
    }
    
    // Array to hold all registered attendees
    Attendee[] public attendees;
    // Check
    mapping(address=> bool) public registeredAttendes;
    
    // Event to emit when an attendee registers
    event AttendeeRegistered(string name, string email, address wallet);
    
    // Function to register an attendee
    function register(string memory _name, string memory _email) public {
        require(registeredAttendes[msg.sender] == false);
        Attendee memory newAttendee = Attendee(_name, _email, msg.sender);
        attendees.push(newAttendee);
        registeredAttendes[msg.sender] = false;
        emit AttendeeRegistered(_name, _email, msg.sender);
    }
    
    // Function to get the total number of attendees registered
    function getAttendeesLen() public view returns (uint256) {
        return attendees.length;
    }
    
    // Function to get the details of a specific attendee by index
    function getAttendeeDetails(uint256 index) public view returns (string memory, string memory, address) {
        require(index < attendees.length, "Invalid attendee index");
        Attendee storage attendee = attendees[index];
        return (attendee.name, attendee.email, attendee.wallet);
    }
}