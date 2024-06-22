const { error } = require('console');
const readline = require('readline');
const readlineSync = require('readline-sync');
// const { stdin: input, stdout: output } = require('process');
const validator = require('validator');

const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout
 });

rl.question('Masukkan nama anda: ', (name) => {
  const askNoTelp = () => {
    rl.question('Masukkan nomor telepon anda: ', (noTelp) => {
      if (!validator.isMobilePhone(noTelp) ) {
        console.error('Masukkan nomor telepon yang valid');
        askNoTelp();
      }
      else {
        const askEmail = () => {
          rl.question('Masukkan email anda: ', (email) => {
            if (!validator.isEmail(email)) {
              console.error('Masukkan email yang valid');
              askEmail();
            } else {       
              process.stdout.write(`Halo ${name}, nomor telepon ${noTelp}, email ${email}\n`);
              rl.close();
            }
          });
        };    
        askEmail();    
      };
    });
  };
  askNoTelp();
});