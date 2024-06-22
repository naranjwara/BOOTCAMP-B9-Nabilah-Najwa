const http = require('http');
const fs = require('fs');
const port = 3000;

const readFileAndRespond = (filePath, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('Error getting the data from the file');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
        }
        res.end();
    });
};

http.createServer((req, res) => {
    const url = req.url;
    console.log(url);

    if (url === '/about') {
        readFileAndRespond('about.html', res);
    } else if (url === '/contact') {
        readFileAndRespond('contact.html', res);
    } else if (url === '/index') {
        readFileAndRespond('index.html', res);
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Hello world</h1>');
        res.end();
    }
}).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
