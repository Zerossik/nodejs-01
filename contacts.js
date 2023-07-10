const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Error reading contacts");
  }
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    const result = contactsList.find(({ id }) => id === contactId);
    return result || null;
  } catch (error) {
    throw new Error("No contact with such ID");
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result || null;
  } catch (error) {
    throw new Error("No contact with such ID");
  }
}
async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newConatcts = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newConatcts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newConatcts;
  } catch (error) {
    throw new Error("Error, failed to add contact.");
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
