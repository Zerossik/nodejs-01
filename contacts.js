const fs = require("fs/promises");
const path = require("path");

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
    throw new Error("Сould not find contact");
  }
}

const log = async (clg) => console.log(await clg("qdggE76Jtbfd9eWJHrssH"));

log(getContactById);

module.exports = {
  listContacts,
  getContactById,
};
