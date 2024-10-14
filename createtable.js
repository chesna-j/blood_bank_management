const connection = require('./db');

// SQL query to create the doctor table
const createDoctorTable = `
  CREATE TABLE IF NOT EXISTS doctor (
    doctor_id INT AUTO_INCREMENT NOT NULL,
    doctor_name VARCHAR(20),
    doc_add VARCHAR(50),
    doc_phno BIGINT,
    PRIMARY KEY (doctor_id)
  );
`;

// SQL query to create the blood_bank table
const createBloodBankTable = `
  CREATE TABLE IF NOT EXISTS blood_bank (
    blood_bank_id INT AUTO_INCREMENT NOT NULL,
    blood_bank_name VARCHAR(50),
    baddress VARCHAR(30),
    PRIMARY KEY (blood_bank_id)
  );
`;

// SQL query to create the donor table
const createDonorTable = `
  CREATE TABLE IF NOT EXISTS donor (
    donor_id INT AUTO_INCREMENT NOT NULL,
    donor_name VARCHAR(20),
    phone_no BIGINT,
    DOB DATE,
    gender CHAR(1),
    address VARCHAR(30),
    weight INT,
    blood_pressure INT,
    iron_content INT,
    doctor_id INT,
    PRIMARY KEY (donor_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
  );
`;

// SQL query to create the blood table
const createBloodTable = `
  CREATE TABLE IF NOT EXISTS blood (
    blood_type VARCHAR(20),
    donor_id INT,
    blood_bank_id INT,
    PRIMARY KEY (donor_id),
    FOREIGN KEY (donor_id) REFERENCES donor(donor_id),
    FOREIGN KEY (blood_bank_id) REFERENCES blood_bank(blood_bank_id)
  );
`;

// SQL query to create the patient table
const createPatientTable = `
  CREATE TABLE IF NOT EXISTS patient (
    patient_id INT AUTO_INCREMENT NOT NULL,
    patient_name VARCHAR(20),
    p_phno BIGINT,
    h_add VARCHAR(50),
    p_add VARCHAR(50),
    PRIMARY KEY (patient_id)
  );
`;

// SQL query to create the blood_delivery table
const createBloodDeliveryTable = `
  CREATE TABLE IF NOT EXISTS blood_delivery (
    blood_bank_id INT,
    patient_id INT,
    PRIMARY KEY (blood_bank_id, patient_id),
    FOREIGN KEY (blood_bank_id) REFERENCES blood_bank(blood_bank_id),
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id)
  );
`;

// Execute each query sequentially to create tables
connection.query(createDoctorTable, (err) => {
  if (err) throw err;
  console.log('doctor table created');

  // After doctor table is created, create blood_bank table
  connection.query(createBloodBankTable, (err) => {
    if (err) throw err;
    console.log('blood_bank table created');

    // After blood_bank table, create donor table
    connection.query(createDonorTable, (err) => {
      if (err) throw err;
      console.log('donor table created');

      // After donor table, create blood table
      connection.query(createBloodTable, (err) => {
        if (err) throw err;
        console.log('blood table created');

        // After blood table, create patient table
        connection.query(createPatientTable, (err) => {
          if (err) throw err;
          console.log('patient table created');

          // After patient table, create blood_delivery table
          connection.query(createBloodDeliveryTable, (err) => {
            if (err) throw err;
            console.log('blood_delivery table created');

            // Close the connection after all tables are created
            connection.end();
          });
        });
      });
    });
  });
});
