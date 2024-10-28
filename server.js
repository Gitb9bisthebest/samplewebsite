// server.js
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
    user: 'postgres', // replace with your PostgreSQL username
    host: 'localhost',
    database: 'my_database', // replace with your database name
    password: 'FieryPhoenix', // replace with your PostgreSQL password
    port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, age, account_type, referrer, bio } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, age, account_type, referrer, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [first_name, last_name, email, password, age, account_type, referrer, bio]
        );
        res.status(200).send('Registration successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in registration');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
