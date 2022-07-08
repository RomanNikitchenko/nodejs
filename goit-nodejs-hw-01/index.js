const contactsOperations = require('./contacts');

// commander
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose  operation')
  .option('-i, --id <type>', 'user  id')
  .option('-n, --name <type>', 'user  name')
  .option('-e, --email <type>', 'user  email')
  .option('-p, --phone <type>', 'user  phone');
program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(newContact);
      break;

    case 'remove':
      const remuveContact = await contactsOperations.removeContact(id);
      console.log(remuveContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// commander
invokeAction(argv);

//list
// invokeAction({ action: 'list' });

//get;
// const id = 1;
// invokeAction({ action: 'get', id });

// add
// const newData = {
//   name: 'Roman',
//   email: 'nikitchenkoroman25@gmail.com',
//   phone: 123123123123,
// };
// invokeAction({ action: 'add', ...newData });

// remove
// const id = '7f3f7182-e941-4477-ae69-5265dc58a942';
// invokeAction({ action: 'remove', id });
