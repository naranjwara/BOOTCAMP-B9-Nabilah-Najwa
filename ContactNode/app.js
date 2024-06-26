const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

// Meimpor konfigurasi pool untuk koneksi database
const pool = require('./db');

const app = express();
const port = 3000;
const dataPath = path.join(__dirname, 'data', 'contacts.json');

// Middleware
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Inisialisasi session untuk setMessage
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Menghubungkan database dengan pooling
app.use(async (req, res, next) => {
    try {
        req.dbClient = await pool.connect();
        next();
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Fungsi mengatur pesan di session
function setMessage(req, message) {
    req.session.message = message;
}

// Route mendapatkan semua kontak 
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await req.dbClient.query('SELECT * FROM contacts');
        res.json(contacts.rows);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        req.dbClient.release();
    }
});

// Route mendapatkan contact by id
app.get('/api/contact/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send('Invalid contact ID'); 
        }

        const queryResult = await req.dbClient.query('SELECT * FROM contacts WHERE id = $1', [id]);
        const contact = queryResult.rows[0];

        if (contact) {
            res.json(contact);
        } else {
            res.status(404).send('Contact not found'); 
        }
    } catch (error) {
        console.error('Error getting contact:', error);
        res.status(500).send('Internal Server Error'); 
    } finally {
        req.dbClient.release();
    }
});

// Route menampilkan semua kontak di halaman 'contacts'
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await req.dbClient.query('SELECT * FROM contacts');
        const message = req.session.message || '';
        delete req.session.message;
        contacts.rows.sort((a, b) => a.name.localeCompare(b.name));
        res.render('contacts', { contacts: contacts.rows, modalContact: null, message });
    } catch (error) {
        console.error('Error getting contacts:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        req.dbClient.release();
    }
});

// Route menampilkan halaman form penambahan kontak baru
app.get('/contacts/add', (req, res) => {
    const message = req.session.message || '';
    delete req.session.message;
    res.render('newContact', { message });
});

// Fungsi memeriksa apakah kontak nama tertentu sudah ada di database
async function contactExists(dbClient, name) {
    const result = await dbClient.query('SELECT * FROM contacts WHERE LOWER(name) = LOWER($1)', [name]);
    return result.rows.length > 0;
}

// Route menambahkan kontak baru melalui API
app.post(
    '/api/contacts', 
    [body('email').isEmail().withMessage('Format email is not valid')],
    async (req, res) => {
        try {
            const { name, mobile, email } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                setMessage(req, errors.array()[0].msg);
                return res.status(400).redirect('/contacts/add');
            }

            // Memanggil fungsi contactExists untuk duplikasi input nama
            const duplicate = await contactExists(req.dbClient, name);
            if (duplicate) {
                setMessage(req, 'Contact with this name already exists!');
                return res.redirect('/contacts/add');
            }

            const insertQuery = 'INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3)';
            await req.dbClient.query(insertQuery, [name, mobile, email]);

            setMessage(req, 'Contact added successfully!');
            res.redirect('/contacts');
        } catch (error) {
            console.error('Error adding contact:', error);
            res.status(500).send('Internal Server Error');
        } finally {
            if (req.dbClient){
                req.dbClient.release();
            }
    }
});

// Route menghapus kontak berdasarkan ID
app.post('/contacts/delete/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).send('Invalid contact ID');
        }

        const deleteQuery = 'DELETE FROM contacts WHERE id = $1';
        const result = await req.dbClient.query(deleteQuery, [id]);

        if (result.rowCount === 0){
            setMessage(req, 'Contact not found');
            return res.redirect('/contacts');
        }

        setMessage(req, 'Contact deleted successfully');
        res.redirect('/contacts');
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        req.dbClient.release();
    }
});

// ROute memperbaharui kontak berdasarkan ID
app.post('/contacts/update/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, mobile, email } = req.body;

        if (isNaN(id)) {
            setMessage(req, 'Invalid contact ID!');
            return res.redirect('/contacts');
        }

        const updateQuery = 'UPDATE contacts SET name = $1, mobile = $2, email = $3 WHERE id = $4';
        const result = await req.dbClient.query(updateQuery, [name, mobile, email, id]);
        if (result.rowCount === 0){
            setMessage(req, 'Contact not found');
            return res.redirect('/contacts');
        }

        setMessage(req, 'Contact update successfully');
        res.redirect('/contacts');
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        req.dbClient.release();
    }
});

// Server listen pada port
app.listen(port, () => {
    console.log(`This app is running on http://localhost:${port}/contacts`);
});
