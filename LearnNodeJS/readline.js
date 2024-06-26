const { error } = require('console');
const readline = require('readline');
const readlineSync = require('readline-sync');
// const { stdin: input, stdout: output } = require('process');
const validator = require('validator');

// intance readline interface untuk menulis ke file 
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout
 });

// Input nama
rl.question('Masukkan nama anda: ', (name) => {
  const askNoTelp = () => {
    // Input nomor telepon
    rl.question('Masukkan nomor telepon anda: ', (noTelp) => {
      // Validasi apakah input nomor telepon yang sesuai
      if (!validator.isMobilePhone(noTelp) ) {
        console.error('Masukkan nomor telepon yang valid');
        askNoTelp();
      }
      else {
        // Input email
        const askEmail = () => {
          rl.question('Masukkan email anda: ', (email) => {
            // Validasi apakah 
            if (!validator.isEmail(email)) {
              console.error('Masukkan email yang valid');
              askEmail();
            } else {       
              process.stdout.write(`Halo ${name}, nomor telepon ${noTelp}, email ${email}\n`);
              rl.close(); // Meberhentikan readline 
            }
          });
        };    
        askEmail();    
      };
    });
  };
  askNoTelp();
});