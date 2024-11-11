let contacts = {};
let groups = {};

// Display contact list
function displayContacts() {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
    for (let name in contacts) {
        const li = document.createElement("li");
        li.innerHTML = `${name} (${contacts[name]}) <button onclick="selectContact('${name}')">Select</button>`; // Corrected with template literals
        contactList.appendChild(li);
    }
}
function makecall(){
    const phoneNumber=document.getElementById("phoneNumber").value;
    if(phoneNumber)
    {
        window.location.href='tel:+91{phoneNumber}';
    }
    else{
        alert("Please Enter a phone number.");
    }
}

// Add new contact
function addContact() {
    const name = document.getElementById("contactName").value;
    const number = document.getElementById("phoneNumber").value;
    if (name && number) {
        contacts[name] = number;
        localStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts();
        document.getElementById("contactName").value = "";
        document.getElementById("phoneNumber").value = "";
    } else {
        alert("Please enter both name and number.");
    }
}

// Select contacts for a new group
let selectedContacts = [];
function selectContact(name) {
    if (!selectedContacts.includes(name)) {
        selectedContacts.push(name);
        displaySelectedContacts();
    }
}

function displaySelectedContacts() {
    const selectedContactsList = document.getElementById("selectedContactsList");
    selectedContactsList.innerHTML = "";
    selectedContacts.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        selectedContactsList.appendChild(li);
    });
}

// Create a new group
function createGroup() {
    const groupName = document.getElementById("groupName").value;
    if (groupName && selectedContacts.length > 0) {
        groups[groupName] = selectedContacts.map(name => contacts[name]);
        localStorage.setItem("groups", JSON.stringify(groups));
        displayGroups();
        document.getElementById("groupName").value = "";
        selectedContacts = [];
        displaySelectedContacts();
    } else {
        alert("Please enter a group name and select contacts.");
    }
}

// Display group list
function displayGroups() {
    const groupList = document.getElementById("groupList");
    groupList.innerHTML = "";
    for (let groupName in groups) {
        const li = document.createElement("li");
        li.innerHTML = `${groupName}: ${groups[groupName].join(", ")}`; 
        groupList.appendChild(li);
    }
}

window.onload = function () {
    contacts = JSON.parse(localStorage.getItem("contacts")) || {};
    groups = JSON.parse(localStorage.getItem("groups")) || {};
    displayContacts();
    displayGroups();
};
