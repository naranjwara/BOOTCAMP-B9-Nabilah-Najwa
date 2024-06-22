const fs = require('fs').promises;
const validator = require('validator');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function getName() {
  return await question('Masukkan nama anda: ');
}

async function getPhoneNumber() {
  let noTelp;
  while (true) {
    noTelp = await question('Masukkan nomor telepon anda: ');
    if (validator.isMobilePhone(noTelp)) break;
    console.error('Masukkan nomor telepon yang valid');
  }
  return noTelp;
}

async function getEmail() {
  let email;
  while (true) {
    email = await question('Masukkan email anda: ');
    if (validator.isEmail(email)) break;
    console.error('Masukkan email yang valid');
  }
  return email;
}

async function saveContact(contact) {
  try {
    const data = await fs.readFile('data/contacts.json', 'utf8');
    const contacts = JSON.parse(data) || [];
    contacts.push(contact);
    await fs.writeFile('data/contacts.json', JSON.stringify(contacts, null, 2));
    console.log(`Halo ${contact.name}, nomor telepon ${contact.noTelp}, email ${contact.email}`);
  } catch (err) {
    console.error('Error membaca atau menyimpan file:', err);
  } finally {
    rl.close();
  }
}

module.exports = {
  getName,
  getPhoneNumber,
  getEmail,
  saveContact,
};
