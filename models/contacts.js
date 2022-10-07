const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactspath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactspath, JSON.stringify(contacts, null, 2));

const listContacts = async()=> {
    const data = await fs.readFile(contactspath);
    return JSON.parse(data);
}

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

const addContact = async(body) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }
    contacts[index] = {contactId, ...body};
    await updateContacts(contacts);
    return contacts[index];
}

const removeContact = async(id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}

// const fs = require('fs');
// const path = require('path');

// const contactsPath = path.resolve('./contacts.json');
// const contactList = fs.readFileSync(contactsPath, 'utf-8');
// const contacts = JSON.parse(contactList);

// const listContacts = async () => {
//     console.log('List of contacts: ');
//     console.table(contacts);

//     return contacts;
// }

// const getContactById = async (contactId, errorMessage) => {
//   const foundContact = contacts.find(contact => {

//   if (contact.id === contactId) {
//       console.log(`Get contact by ID=${contactId}:`);
//       console.table(contact);
//       return contact;
//   }
// });

// if (!foundContact) {
//   console.log(errorMessage);
// }

// return foundContact;

// }

// const removeContact = async (contactId, errorMessage) => {
//   const newContacts = contacts.filter(contact => contact.id !== contactId);

//     if (newContacts.length === contacts.length) {
//         console.log(errorMessage);
//         return contacts;
//     }

//     console.log('Contact deleted successfully! New list of contacts: ');
//     console.table(newContacts);

//     fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
//         if (error) {
//             return console.log('error :', error);
//         }
//     });

//     return newContacts;
// }

// const addContact = async (name, email, phone) => {
//   contacts.push({
//     id: contacts.length + 1,
//     name: name,
//     email: email,
//     phone: phone,
// });

// console.log('Contacts added successfully! New lists of contacts: ');
// console.table(contacts);

// fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
//     if (error) {
//         return console.log(error);
//     }
// });

// return contacts;
// }

// const updateContact = async (contactId, name, email, phone, errorMessage) => {
//   const contact = contacts.find(contact => {
//     if (contact.id === contactId) {
//         contact.name = name;
//         contact.email = email;
//         contact.phone = phone;
//         console.log(`Contact with ID ${contactId} updated!`);
//         console.table(contacts);
//         return contact;
//     }
// });

// if (contact == null) {
//     console.log(errorMessage);
//     return;
// }

// fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
//     if (error) {
//         return console.log(error);
//     }
// });

// return contacts;
// }

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
