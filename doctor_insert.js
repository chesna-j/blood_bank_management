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

    // Array of doctor values to insert (doctor_id is auto-incremented)
    const doctors = [
        ['Dr. John Doe', '123 Health St', '1234567890'],
        ['Dr. Jane Smith', '456 Care Ave', '2345678901'],
        ['Dr. Sarah Lee', '789 Wellness Blvd', '3456789012'],
        ['Dr. Mike Brown', '101 Medicine Rd', '4567890123'],
        ['Dr. Emily Davis', '202 Healing Ln', '5678901234'],
        ['Dr. Alan White', '303 Vitality St', '6789012345'],
        ['Dr. Karen Miller', '404 Recovery Dr', '7890123456'],
        ['Dr. Anna Wilson', '505 Remedy Ave', '8901234567'],
        ['Dr. David Garcia', '606 Cure Blvd', '9012345678'],
        ['Dr. Lisa Martinez', '707 Relief Rd', '0123456789']
    ];

    // Insert each doctor into the database
    doctors.forEach(doctor => {
        const query = `
            INSERT INTO doctor (doctor_name, doc_add, doc_phno) 
            VALUES (?, ?, ?);
        `;

        connection.query(query, doctor, (error, results) => {
            if (error) {
                console.error('Error executing query:', error);
                return;
            }
            console.log('Inserted doctor with ID:', results.insertId);
        });
    });

    connection.end(); // Close the connection after all insertions
});
