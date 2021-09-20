import { listContacts,
    getContactById,
    removeContact,
    addContact } from "./contacts.js"

import { Command } from "commander";
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        try {
          const contacts = await listContacts();
          console.table(contacts);
        } catch (error) {
          console.log(error);
        }
        break;
  
      case "get":
        try {
          const contactById = await getContactById(id);
          console.table(contactById);
        } catch (error) {
          console.log(error);
        }
        break;
  
      case "add":
        try {
          const newContact = await addContact(name, email, phone);
          console.log(`contact ${name} was added!`);
          console.table(newContact);
        } catch (error) {
          console.log(error);
        }
        break;
  
      case "remove":
        try {
          const filteredContacts = await removeContact(id);
          console.log(`Contact ${id} was deleted!`);
          console.table(filteredContacts);
        } catch (error) {
          console.log(error);
        }
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  };
  invokeAction(argv);