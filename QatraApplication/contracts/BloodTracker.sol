pragma solidity 0.5.0;

contract BloodTracker {
	
	// the organization that owns the contract
	address public owner;
	//address public donorAddr;


	struct Donor {
		address addr;
		string name;
		string bloodType;
		bool init; // keep or remove?
	}


	struct Asset{
		// the `donation`
		string place;
		string time;
		Donor donor;
		uint qty;
		string bloodType;
		bool isConsumed;
	}

	struct Patient{
		address addr;
		string name;
		string details;
		string medicalRecordNumber;
	}

	/*struct Organization{

	}*/

	mapping (address => Donor) donors;
	mapping (uint => Asset) assets;
	mapping (address => Patient) patients;
	//mapping (address => Organization) organizations;
	uint assetNumber;

	event DonationMade(string name, string place, string bloodType, uint qty, uint assetNumber);


	constructor() public {
		// could add organization name in the params? I guess?
		owner = msg.sender;
	}

	// from donor to organization
	function donateBlood(address donorAddr, string memory name, string memory bloodType, string memory place, string memory time, uint qty) public {
		// create the donor?
		// add a check that the donor doesn't already exist, if it does, get the donor, and not create one
		donors[donorAddr] = Donor(donorAddr, name, bloodType, true);
		assetNumber++;
		assets[assetNumber] = Asset(place, time, donors[donorAddr], qty, donors[donorAddr].bloodType, false);
		// do we fire some event as well? what do we return? do we return anything?

		// Trigger the event
		// tells the donor name, the location of the donation, blood type, qty donated and donation id 
    	emit DonationMade(name, place, bloodType, qty, assetNumber);
	}

	// from organization to patient
	function receiveBlood(address patientAddr, string memory patientName, string memory patientDetails, string memory patientMedicalRecordNumber) public {
		// create patient?
		// what if a patient requires multiple donations? how do you handle that?
		// maybe we should keep a different key? we probably should

		patients[patientAddr] = Patient(patientAddr, patientName, patientDetails, patientMedicalRecordNumber);

		// update the asset somehow? update it such that the consumed variable gets set to true
	}

	/*function getDonations() public returns (Asset[assetNumber] memory) {
		Asset[] donations = new Assets[](assetNumber);
		for(uint256 i = 0; i < assetNumber; i++){
			donations[i] = assets[0];
		}
		return donations;
	}*/


		
}
