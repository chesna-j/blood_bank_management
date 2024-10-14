// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// CRUD Operations for Doctor

// Create a Doctor
app.post('/doctors', (req, res) => {
    const { doctor_name, doc_add, doc_phno } = req.body;
    const query = 'INSERT INTO doctor (doctor_name, doc_add, doc_phno) VALUES (?, ?, ?)';
    connection.query(query, [doctor_name, doc_add, doc_phno], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, doctor_name, doc_add, doc_phno });
    });
});

// Read all Doctors
app.get('/doctors', (req, res) => {
    connection.query('SELECT * FROM doctor', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Update a Doctor
app.put('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { doctor_name, doc_add, doc_phno } = req.body;
    const query = 'UPDATE doctor SET doctor_name = ?, doc_add = ?, doc_phno = ? WHERE doctor_id = ?';
    connection.query(query, [doctor_name, doc_add, doc_phno, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, doctor_name, doc_add, doc_phno });
    });
});

// Delete a Doctor
app.delete('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM doctor WHERE doctor_id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).send();
    });
});
// Create a Donor
app.post('/donors', (req, res) => {
    const { donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id } = req.body;
    const query = 'INSERT INTO donor (donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id });
    });
});

// Read all Donors
app.get('/donors', (req, res) => {
    connection.query('SELECT * FROM donor', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Update a Donor
app.put('/donors/:id', (req, res) => {
    const { id } = req.params;
    const { donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id } = req.body;
    const query = 'UPDATE donor SET donor_name = ?, phone_no = ?, DOB = ?, gender = ?, address = ?, weight = ?, blood_pressure = ?, iron_content = ?, doctor_id = ? WHERE donor_id = ?';
    connection.query(query, [donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, donor_name, phone_no, DOB, gender, address, weight, blood_pressure, iron_content, doctor_id });
    });
});

// Delete a Donor
app.delete('/donors/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM donor WHERE donor_id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).send();
    });
});
// Create a Patient
app.post('/patients', (req, res) => {
    const { patient_name, p_phno, h_add, p_add } = req.body;
    const query = 'INSERT INTO patient (patient_name, p_phno, h_add, p_add) VALUES (?, ?, ?, ?)';
    connection.query(query, [patient_name, p_phno, h_add, p_add], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, patient_name, p_phno, h_add, p_add });
    });
});

// Read all Patients
app.get('/patients', (req, res) => {
    connection.query('SELECT * FROM patient', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Update a Patient
app.put('/patients/:id', (req, res) => {
    const { id } = req.params;
    const { patient_name, p_phno, h_add, p_add } = req.body;
    const query = 'UPDATE patient SET patient_name = ?, p_phno = ?, h_add = ?, p_add = ? WHERE patient_id = ?';
    connection.query(query, [patient_name, p_phno, h_add, p_add, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, patient_name, p_phno, h_add, p_add });
    });
});

// Delete a Patient
app.delete('/patients/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM patient WHERE patient_id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).send();
    });
});
// CRUD Operations for Blood Bank

// Create a Blood Bank
app.post('/blood_banks', (req, res) => {
    const { blood_bank_name, baddress } = req.body;
    const query = 'INSERT INTO blood_bank (blood_bank_name, baddress) VALUES (?, ?)';
    connection.query(query, [blood_bank_name, baddress], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, blood_bank_name, baddress });
    });
});

// Read all Blood Banks
app.get('/blood_banks', (req, res) => {
    connection.query('SELECT * FROM blood_bank', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Update a Blood Bank
app.put('/blood_banks/:id', (req, res) => {
    const { id } = req.params;
    const { blood_bank_name, baddress } = req.body;
    const query = 'UPDATE blood_bank SET blood_bank_name = ?, baddress = ? WHERE blood_bank_id = ?';
    connection.query(query, [blood_bank_name, baddress, id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ id, blood_bank_name, baddress });
    });
});

// Delete a Blood Bank
app.delete('/blood_banks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM blood_bank WHERE blood_bank_id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).send();
    });
});

// CRUD Operations for Blood

// Create Blood Record
app.post('/blood', (req, res) => {
    const { blood_type, donor_id, blood_bank_id } = req.body;
    const query = 'INSERT INTO blood (blood_type, donor_id, blood_bank_id) VALUES (?, ?, ?)';
    connection.query(query, [blood_type, donor_id, blood_bank_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json({ id: results.insertId, blood_type, donor_id, blood_bank_id });
    });
});

// Read all Blood Records
app.get('/blood', (req, res) => {
    connection.query('SELECT * FROM blood', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Update a Blood Record
app.put('/blood/:donor_id', (req, res) => {
    const { donor_id } = req.params;
    const { blood_type, blood_bank_id } = req.body;
    const query = 'UPDATE blood SET blood_type = ?, blood_bank_id = ? WHERE donor_id = ?';
    connection.query(query, [blood_type, blood_bank_id, donor_id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ donor_id, blood_type, blood_bank_id });
    });
});

// Delete a Blood Record
app.delete('/blood/:donor_id', (req, res) => {
    const { donor_id } = req.params;
    const query = 'DELETE FROM blood WHERE donor_id = ?';
    connection.query(query, [donor_id], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).send();
    });
});
//procedureee
app.post('/call-procedure', (req, res) => {
    const { no, value } = req.body; // these are the parameters for the procedure

    const query = 'CALL main(?, ?)';
    connection.query(query, [no, value], (err, results) => {
        if (err) {
            console.error('Error executing procedure:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Procedure result will be in the first element of the results array
        res.status(200).json(results[0]); 
    });
});
// Start the server
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});