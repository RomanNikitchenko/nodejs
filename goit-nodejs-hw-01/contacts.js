const { v4 } = require('uuid');
const fs = require('fs/promises');
const contactsPath = require('./db/filePath');
const updataContacts = require('./db/updataContacts');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async id => {
  const idStr = String(id);
  const data = await listContacts();
  const contact = data.find(contact => contact.id === idStr);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async id => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updataContacts(newContacts);
  return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updataContacts(data);
  return newContact;
};

const contactsOperations = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contactsOperations;
