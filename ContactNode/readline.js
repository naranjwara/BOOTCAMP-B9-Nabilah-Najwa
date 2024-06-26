const { error } = require('console');
const readline = require('readline');
// const readlineSync = require('readline-sync');
// const { stdin: input, stdout: output } = require('process');
const validator = require('validator');

// Interface readline untuk menerima input dari terminal
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout
 });

// Menanyakan nama pengguna
rl.question('Masukkan nama anda: ', (name) => {
  const askNoTelp = () => {
    // Menyananyakan nomor telepon pengguna 
    rl.question('Masukkan nomor telepon anda: ', (noTelp) => {
      // Validator nomor dengan 'validator'
      if (!validator.isMobilePhone(noTelp) ) {
        console.error('Masukkan nomor telepon yang valid');
        askNoTelp();
      }
      else {
        const askEmail = () => {
          rl.question('Masukkan email anda: ', (email) => {
            // Validasi email menggunakan 'validator'
            if (!validator.isEmail(email)) {
              console.error('Masukkan email yang valid');
              askEmail();
            } else {       
              process.stdout.write(`Halo ${name}, nomor telepon ${noTelp}, email ${email}\n`);
              rl.close(); // Menutup interface readline
            }
          });
        };    
        askEmail();    
      };
    });
  };
  askNoTelp();
});