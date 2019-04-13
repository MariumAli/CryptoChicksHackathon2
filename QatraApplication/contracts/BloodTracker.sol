pragma solidity 0.5.0;

contract BloodTracker{
	
	// address of the owner
	address owner;

	struct Donor{
		string name;
		string bloodType;
	}	

	struct Donation{
		string city;
		string date;
		address donor;
		address donationOwner;
		uint qty;
		string bloodType;
		bool isConsumed;
	}

	struct Patient{
		string name;
		string details;
		string medicalRecordNumber;
	}

	mapping (address => Donor) donors; // mapping of donors
	mapping (address => Patient) patients; // mapping of patients
	mapping (address => Donation) donations; // mapping of donations made
	mapping (address => string) organizations; // mapping of organizations

	uint numberOfDonations;
	uint numberOfAvailableDonations;

	// from donor to organization
	event BloodTaken(string name, string city, string bloodType, uint qty, uint numberOfDonations, string organizationName);
	// from organization to patient
	event BloodGiven(string name, string details, string bloodType, uint qty, uint numberOfAvailableDonations, string organizationName);
	event OwnershipChanged(uint donationId, string oldOwner, string newOwner, string date);

	constructor(string member orgName) public {
		organizations[msg.sender] = orgName;
	}


	// from donor to organization 
	function takeBlood(address donorAddr, string memory donorName, string memory bloodType, string memory city, string memory date, uint qty) public {

		// check if Donor doesn't already exist in system. if not, insert a new donor
		if (donors[donorAddr] == 0) {
			donors[donorAddr] = Donor(donorName, bloodType);
		}

		numberOfDonations ++;
		numberOfAvailableDonations ++;

		// insert new donation in record, with the relevant details, and `isConsumed` set to false. 
		// Currently the owner is the organization the donor gave blood to
		donations[numberOfDonations] = Donation(city, date, donorAddr, owner, qty, bloodType, false);

		// tells the donor name, the location of the donation, blood type, qty donated, donation id, and 
		// the organization this was given to
		emit BloodTaken(donorName, city, bloodType, qty, numberOfDonations, organizations[owner]);
	}

	// from organization to patient
	function giveBlood(address patientAddr, string memory patientName, string memory patientDetails, string memory patientMedicalRecordNumber) public {
		
		// we should have donations in the system to be able to proceed
		require(numberOfAvailableDonations >= 1);

		// check if patient doesn't already exist in our system. if not, insert a new patient
		if (patients[patientAddr] == 0){
			patients[patientAddr] = Patient(patientName, patientDetails, patientMedicalRecordNumber);
		}

		// update the donation that was consumed
		donations[numberOfAvailableDonations].isConsumed = true;
		address oldDonationOwner = donations[numberOfAvailableDonations].donationOwner;
		// update the ownership of the donation to that of the patient
		donations[numberOfAvailableDonations].donationOwner = patientAddr;

		// tells the details of the patient this blood was given to, the blood type, how much blood was given, 
		// the donation id, and the organization the patient got this donation from
		emit BloodGiven(patientName, patientDetails, donations[numberOfAvailableDonations].bloodType, donations[numberOfAvailableDonations].qty, numberOfAvailableDonations, organizations[oldDonationOwner]);

		numberOfAvailableDonations --;
	}

	// to be called everytime the donation changes hands, except for the start and end points. for example, if after collection, the donated blood
	// is going to be stored at some particular place, or is going to be transported via some particular entity, 
	// that place / entity will be the new owner. This will help us keep track of the route followed by the donation 

	function changeOwnership(uint donationId, string member date) public {

		address oldDonationOwner = donations[donationId].donationOwner;
		donations[donationId].donationOwner = owner;

		emit OwnershipChanged(donationId, organizations[oldDonationOwner], organizations[owner], date);
	}

}
