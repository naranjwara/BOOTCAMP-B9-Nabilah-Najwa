const Pool = require('pg').Pool;

// Instance pool koneksi ke database PostgreSQL
const pool = new Pool({
    user: "postgres",
    password: "01012015",
    database: "postgres",
    host: "localhost",
    port: 5432
});

// Ekspor instance pool 
module.exports = pool;