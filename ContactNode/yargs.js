const yargs = require("yargs");
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'data', 'contacts.json');

async function readContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data) || [];
    } catch (err) {
        console.error(`Error reading the file`, err);
        throw err;
    }
}

async function findByName(contacts, name) {
    const contact = contacts.find(contact => contact.name === name);
    return contact;
}

async function writeContacts(contacts) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (err) {
        console.error(`Error writing contacts to file`, err);
        throw err;
    }
}

async function addContact(name, mobile, email = '') {
    if (!mobile) {
        console.error('Mobile number cannot be empty');
        return;
    }
    let contacts = await readContacts();
    
    const existingContact = await findByName(contacts, name);
    if (existingContact) {
        console.error(`Contact with name ${name} already exists`);
        return;
    }

    const nextId = await checkId(contacts);
    const contact = { id: nextId, name, mobile, email };
    contacts.push(contact);

    await writeContacts(contacts);
    console.log(`Contact "${name}" added successfully`);
}

async function checkId(contacts) {
    if (!contacts) {
        contacts = await readContacts();
    }

    let nextId;

    if (contacts.length === 0) {
        nextId = 1;
    } else {
        const maxId = contacts.reduce((max, contact) => (contact.id > max ? contact.id : max), 0);
        nextId = maxId + 1;
    }

    return nextId;
}

async function listContacts() {
    const contacts = await readContacts();
    console.log(`Contacts:`);
    contacts.forEach(contact => {
        console.log(`name: ${contact.name}, mobile: ${contact.mobile}`);
    });
}

async function updateContact(oldName, newName, mobile, email = '') {
    let contacts = await readContacts();

    const contactIndex = contacts.findIndex(contact => contact.name === oldName);

    if (contactIndex !== -1) {
        let contact = contacts[contactIndex]; 

        if (newName) {
            contact.name = newName;
        }
        if (email !== '') {
            contact.email = email;
        }
        if (typeof mobile !== 'undefined') {
            contact.mobile = mobile;
        }

        await writeContacts(contacts);
        console.log(`Contact "${oldName}" updated successfully`);
    } else {
        console.error(`Contact "${oldName}" not found`);
    }
}

async function getContactDetails(name) {
    const contacts = await readContacts();
    const contact = await findByName(contacts, name);
    if (contact) {
        console.log(`Contact details:`);
        console.log(`  id: ${contact.id}, name: ${contact.name}, mobile: ${contact.mobile}, email: ${contact.email}`);
    } else {
        console.log(`No contact found with name "${name}"`);
    }
}

async function deleteContact(name) {
    let contacts = await readContacts();
    const initialLength = contacts.length;

    contacts = contacts.filter(contact => contact.name !== name);

    if (contacts.length < initialLength) {
        await writeContacts(contacts);
        console.log(`Contact "${name}" deleted successfully`);
    } else {
        console.error(`Cannot find contact "${name}"`);
    }
}

yargs.command({
    command: 'add',
    describe: 'Add a new contact',
    builder: {
        name: {
            describe: 'Name of the contact',
            demandOption: true,
            type: 'string'
        },
        mobile: {
            describe: 'Mobile number of the contact',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email of the contact',
            type: 'string'
        }
    },
    handler: (argv) => {
        addContact(argv.name, argv.mobile, argv.email);
    }
});

yargs.command({
    command: 'list',
    describe: 'List all contacts',
    handler: () => {
        listContacts();
    }
});

yargs.command({
    command: 'update',
    describe: 'Update contact information',
    builder: {
        oldName: {
            describe: 'Indicator to call the contact by name',
            demandOption: true,
            type: 'string'
        },
        newName: {
            describe: 'New name of the contact',
            type: 'string',
        },
        mobile: {
            describe: 'New mobile number of the contact',
            type: 'string'
        },
        email: {
            describe: 'New email of the contact',
            type: 'string'
        }
    },
    handler: (argv) => {
        updateContact(argv.oldName, argv.newName, argv.mobile, argv.email);
    }
});

yargs.command({
    command: 'details',
    describe: 'Show contact details by name',
    builder: {
        name: {
            describe: 'Name of the contact',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        getContactDetails(argv.name);
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete contact by name',
    builder: {
        name: {
            describe: 'Name of the contact to delete',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        deleteContact(argv.name);
    }
});

module.exports = yargs;