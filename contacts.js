// contacts.js
import { promises as fs } from "fs";
import path from "path";
import shortid from "shortid";

  const contactsPath = path.resolve("./db/contacts.json");
 

// TODO: задокументировать каждую функцию
export const listContacts = async () => {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  
    // ...твой код
  }
  
  export const getContactById = async (contactId) => {
    try {
      const contacts = await listContacts();
      const contact = contacts.find((item) => item.id === Number(contactId));
      if (!contact) {
        console.log(`Contact by id ${contactId} not found!`);
      }
      return contact;
    } catch (error) {
      console.log(error);
    }
    // ...твой код
  }
  
  export const removeContact = async (contactId) => {
    try {
      const contacts = await listContacts();
      const filteredContacts = await contacts.filter(
        (contact) => contact.id != Number(contactId)
      );
      return filteredContacts;
    } catch (error) {
      console.log(error);
    }
    // ...твой код
  }
  
  export const addContact = async (name, email, phone) => {
    const contact = {
      id: shortid.generate(),
      name,
      email,
      phone,
    };
  
    try {
      const contacts = await listContacts();
      contacts.push(contact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return contact;
    } catch (error) {
      console.log(error);
    }
    // ...твой код
  }

  export default {
      listContacts,
      getContactById,
      removeContact,
      addContact
  }