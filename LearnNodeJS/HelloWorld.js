
const fs = require('fs');
const readline = require('readline');
const nama = "Nara";
const noTelp = "089655960287";

fs.readFile('HelloWorld.js','utf-8',(err, data) => {
    if (err) throw err;
    console.log(data)
});

