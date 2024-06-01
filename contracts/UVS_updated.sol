// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/*

This contract creates and manages tokens for one or more universities. It assigns roles to the addresses 
(or entites) based on their position in real life (STU for students, DEG for degrees and UNI for universities). The address 
that launches the contract will be the owner of the contract and will be assigned the role AUT, standing for
authority.

Each address that wants to interact with this contract will need to be assigned a role by the 
authority (except for the authority itself) or it will otherwise have the role of NONE.

Students can spend their tokens for real life services and degrees can reward their students based
on real life achievements.

Roles are crucial and are useful for limiting the user's levle of freedom in using the code.
Roles are also used to relate the addresses and give logical bounds between the universty, the
degrees and students.

*/

contract UVS_updated is ERC20 {

    // Variables
    address public owner; // contract's owner
    enum Role { NONE, STU, DEG, UNI, AUT }

    // Mappings
    mapping(address => student) public studentRef; // The given address is linked to a struct with properties that represent a student. Only used for addresses that belong to students 
    mapping(address => degree) public degreeRef; // The given address is linked to a struct with properties that represent a degree. Only used for addresses that belong to degrees  
    mapping(address => Role) public ownRole; // The given address is linked to a certain role
    mapping(address => mapping(address => uint)) public specificBalanceOf; // The given address is linked to another address, representing a degree, 
                                                                           // which is linked to a balance that is unique to the inicial address
    mapping(string => address) public codeOf; // The given string is a reference code of the adrress resulting of this mapping

    // Modifiers
    modifier onlyAUT 
    {
        require((ownRole[msg.sender] == Role.AUT), "Only the authority can use this function");
        _;
    }
    modifier onlyUNI 
    {
        require((ownRole[msg.sender] == Role.UNI || ownRole[msg.sender] == Role.AUT), "Only universities can use this function");
        _;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////
    modifier nonSTU 
    {
        require(ownRole[msg.sender] >= Role.DEG, "Students can't use this function");
        _;
    }


    // Events
    event UniTransfer(address indexed from, address indexed to, uint256 amount, address srcCurrency, address dstCurrency, uint currentSrcExRate, uint currentDstExRate);
    event UniMint(address indexed from, address indexed to, uint256 amount, address dstCurrency, uint currentDstExRate);
    event StudentSet(address indexed student, address indexed degree);
    event StudentRemoved(address indexed student, address indexed degree, bool graduated);
    event DegreeSet(address indexed degree, string indexed code);
    event DegreeDisabled(address indexed degree);
    event UniversitySet(address indexed university, string indexed code);
    event SetExRate (address currency, uint newRate);

    // Constructor
    constructor() ERC20("Universies", "UVS") 
    {
        // owner = msg.sender;
        owner = 0x7934DD7fc12B784dA060898239EB867A8e5EDb43;
        ownRole[owner] = Role.AUT;
    }

    // Structs
    struct student 
    { 
        string name;
        string surnames;
        string id;
        address degreeAdd;
        /* A given address with role STU will be tied to the following values:

            - A mapping to its student struct
            - A mapping to its assigned role

            This struct will be used in a satter for student entities

        */
    }
    struct degree 
    {
        string code;
        address universityAdd;
        bool active;
        uint exchRate;
        /* A given address with role DEG will be tied to the following values:

            - A mapping to its degree struct
            - A mapping to its assigned role
            - In an inverted manner, a mapping (string => addresse) from which it can be identified by kowing its associated code

            This struct will be used in a satter for degree entities

        */
    }

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
//                                                                                              //
//                                          Functions                                           //
//                                                                                              //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////

// Setters ///////////////////////////////////////////////////////////////////////////////////////

    // Student
    function setStudent(address user, string memory name, string memory surnames, string memory id, address degreeAdd) external onlyUNI
    {
        require(ownRole[user] == Role.NONE, "This address is already in the system");
        require(ownRole[degreeAdd] == Role.DEG, "Invalid address for a Degree");

        student memory stu = student ({

            name: name,
            surnames: surnames,
            degreeAdd: degreeAdd,
            id: id

        });

        studentRef[user] = stu;
        ownRole[user] = Role.STU;

        emit StudentSet(user, degreeAdd);
    }

    // Degree
    function setDegree(address user, string memory code, address universityAdd) external onlyUNI
    {
        require(ownRole[user] == Role.NONE, "This address is already in the system");
        require(codeOf[code] == 0x0000000000000000000000000000000000000000, "Code already in use");
        require(ownRole[universityAdd] == Role.UNI, "Invalid code for university");

        degree memory deg = degree ({
            code: code,
            universityAdd: universityAdd,
            active: true,
            exchRate: 1
        });

        degreeRef[user] = deg;
        ownRole[user] = Role.DEG;
        codeOf[code] = user;

        emit DegreeSet(user, code);
    }

    // University
    function setUniversity(address user, string memory code) external onlyAUT
    {
        require(ownRole[user] == Role.NONE, "This address is already in the system");
        require(codeOf[code] == 0x0000000000000000000000000000000000000000, "Code already in use");

        ownRole[user] = Role.UNI;
        codeOf[code] = user;

        emit UniversitySet(user, code);
    }

    function setExRate (address currency, uint newRate) external onlyAUT
    {
        require(ownRole[currency] == Role.DEG, "Bad currency");
        require(degreeRef[currency].exchRate != newRate && degreeRef[currency].exchRate != 0, "Bad Exchange Rate");
        degreeRef[currency].exchRate = newRate;

        emit SetExRate(currency, newRate);
    }

// Transfers /////////////////////////////////////////////////////////////////////////////////////

    // Every hypothetical transfer between different addresses or between different curencies from the same address will be efectuated using this method
    function uniTransfer(address to, uint amount, address srcCurrency, address dstCurrency) external 
    {
        require(!(msg.sender == to && srcCurrency == dstCurrency), "Request not suitable"); 
        // Checking that no address is transfering to itself amounts from the same currency as it wouldn't make sense

        require(ownRole[srcCurrency] == Role.DEG && ownRole[dstCurrency] == Role.DEG, "One of the currencies, or both, is invalid");
        // Checking that the currencies exist by making sure that the addresses used as a reference belong to degrees
        
        require(degreeRef[dstCurrency].active == true, "Destination currency is inactive");
        // If a currency is inactive, personal balance can't increase in this given currency, but should rather be decreased as soon as posible

        
        uint currentSrcExRate =  degreeRef[srcCurrency].exchRate;
        
        require (specificBalanceOf[msg.sender][srcCurrency] >= amount/currentSrcExRate, "Insufficient balance");
        // The sender has the amount

        uint currentDstExRate =  degreeRef[dstCurrency].exchRate;

        require (amount/currentDstExRate >= 1, "There will be a total loss if those are the parameters selected");
        // The receiver doesn't gain 0 coins

        uint srcBalance = specificBalanceOf[msg.sender][srcCurrency];
        uint dstBalance = specificBalanceOf[to][dstCurrency];

        

        _mint(msg.sender,(amount*currentSrcExRate));
        srcBalance -= amount/currentSrcExRate;
        specificBalanceOf[msg.sender][srcCurrency] = srcBalance;
        if (msg.sender != to) {

            _transfer(msg.sender, to, amount);

        }

        _burn(to, amount);
        dstBalance += amount/currentDstExRate;
        specificBalanceOf[to][dstCurrency] = dstBalance;

        emit UniTransfer(msg.sender, to, amount, srcCurrency, dstCurrency, currentSrcExRate, currentDstExRate);
    }

    // With this function, every authorized entity can mint coins to a certain currency
    function uniMint (address to, uint amount, address dstCurrency) external nonSTU 
    {
        
        require(dstCurrency != 0x0000000000000000000000000000000000000000 && ownRole[dstCurrency] == Role.DEG, "Invalid currency");
        // Checking if the code of the currency exists and belongs to a degree
        
        require(degreeRef[dstCurrency].active == true, "Destination currency is inactive");
        // If a currency is inactive, personal balance can't increase in this given currency, 
        // but should rather be decreased as soon as posible

        uint dstBalance = specificBalanceOf[to][dstCurrency];
        uint currentDstExRate =  degreeRef[dstCurrency].exchRate;

        _mint(msg.sender,amount);
        if (msg.sender != to) {

            _transfer(msg.sender, to, amount);

        }
        _burn(to, amount);
        dstBalance += amount/currentDstExRate;
        specificBalanceOf[to][dstCurrency] = dstBalance;

        emit UniMint(msg.sender, to, amount, dstCurrency, currentDstExRate);
    }
// Removers //////////////////////////////////////////////////////////////////////////////////////

    // Reverts the mappings (this address will have no student struct and a role of NONE) for a student
    function RemStudent(address user, bool graduated) external onlyUNI 
    {
        require(ownRole[user] == Role.STU, "Student doesn't exist");

        delete studentRef[user];
        ownRole[user] = Role.NONE;

        emit StudentRemoved(user, studentRef[user].degreeAdd, graduated);
    }

    // Invalidates a degree (sets its active property to false)
    function DisDegree(address user) external onlyUNI 
    {
        require(ownRole[user] == Role.DEG, "Degree doesn't exist");
        require( degreeRef[user].active == true, "Degree already disabled");

        degreeRef[user].active = false;

        emit DegreeDisabled(user);
    }


// Misc //////////////////////////////////////////////////////////////////////////////////////////

    // Validates a degree (sets its active property to true)
    function EnDegree(address user) external onlyUNI 
    {
        require(ownRole[user] == Role.DEG, "Degree doesn't exist");
        require( degreeRef[user].active == false);

        degreeRef[user].active = true;

        emit DegreeSet(user, degreeRef[user].code);
    }    
    // Modifies the string used for representing a degree or a university (the code)
    function changeCode (string memory newCode) external nonSTU 
    {
        require(ownRole[msg.sender] == Role.DEG || ownRole[msg.sender] == Role.UNI, "This address is not suitable");
        require(codeOf[newCode] == 0x0000000000000000000000000000000000000000, "Code already in use");

        string memory oldCode = degreeRef[msg.sender].code;
        delete codeOf[oldCode];
        codeOf[newCode] = msg.sender;

        if (ownRole[msg.sender] == Role.DEG ) {
            degreeRef[msg.sender].code = newCode;
        }
    }
}