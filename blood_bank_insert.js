const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blood_bank_management'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');

    // Array of blood bank values to insert
    const bloodBanks = [
        ['Central Blood Bank', '123 Central St'],
        ['City Blood Donation Center', '456 Main Ave'],
        ['Regional Blood Services', '789 North Blvd'],
        ['Healthy Hearts Blood Bank', '101 West Rd'],
        ['Community Blood Drive', '202 South St'],
        ['Hope Blood Bank', '303 Hope St'],
        ['Life Savers Blood Bank', '404 Life St'],
        ['Safe Blood Center', '505 Safety St'],
        ['Emergency Blood Bank', '606 Emergency Rd'],
        ['Donors Unite Blood Bank', '707 Unity St']
    ];

    // Insert each blood bank into the database
    bloodBanks.forEach(bank => {
        const query = `
            INSERT INTO blood_bank (blood_bank_name, baddress) 
            VALUES (?, ?);
        `;

        connection.query(query, bank, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }
            console.log('Inserted blood bank with ID:', results.insertId);
        });
    });

    connection.end(); // Close the connection
});
