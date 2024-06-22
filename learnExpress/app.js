const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'view')));

app.set('view engine', 'ejs');

const categories = { 
    1: 'shoes',
    2: 'electronics',
    3: 'clothing'
};

function sendFileWithStatus(res, filePath, statusCode) {
    res.status(statusCode).render(filePath, (err) => {
        if (err) {
            console.error(`Error sending file: ${err}`);
            res.status(500).send('Internal Server Error');
        }
    });
}

app.get('/product/:id/:category?', (req, res) => {
    const productId = req.params.id;
    const categoryId = parseInt(req.params.category); 

    const categoryName = categoryId ? categories[categoryId] : 'NA'; 

    res.send(`product id: ${productId} category: ${categoryName}`);
});

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'view', 'index.ejs');
    sendFileWithStatus(res, filePath, 200);
});

app.get('/about', (req, res) => {
    const filePath = path.join(__dirname, 'view', 'about.ejs');
    sendFileWithStatus(res, filePath, 200);
});

app.get('/contact', (req, res) => {
    const filePath = path.join(__dirname, 'view', 'contact.ejs');
    sendFileWithStatus(res, filePath, 200);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`This app is running on http://localhost:${port}`);
});
