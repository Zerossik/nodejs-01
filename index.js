const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      try {
        const getList = await listContacts();
        console.table(getList);
      } catch (error) {
        console.log(error);
      }
      break;
    case "get":
      try {
        const getUser = await getContactById(id);
        console.log(getUser);
      } catch (error) {
        console.log(error);
      }
      break;
    case "add":
      try {
        const addedСontact = await addContact(name, email, phone);
        console.log(addedСontact);
      } catch (error) {
        console.log(error);
      }
      break;
    case "remove":
      try {
        const remoteСontact = await removeContact(id);
        console.log(remoteСontact);
      } catch (error) {
        console.log(error);
      }

      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
