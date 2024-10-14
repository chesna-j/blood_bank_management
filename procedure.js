const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '', 
  database: 'blood_bank_management' 
});


const dropProcedureQuery = 'DROP PROCEDURE IF EXISTS main;';


const createProcedureQuery = `
CREATE PROCEDURE main(IN no INT, IN value VARCHAR(20))
BEGIN
  SELECT blood_type, COUNT(blood_type) AS count1
  FROM blood b1
  WHERE blood_type = value
  AND EXISTS (
    SELECT blood_bank_id
    FROM blood_bank b2
    WHERE b2.blood_bank_id = no
    AND b1.blood_bank_id = b2.blood_bank_id
  );
END;
`;

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  connection.query(dropProcedureQuery, (err) => {
    if (err) {
      console.error('Error dropping procedure:', err);
      connection.end(); 
      return;
    }

    connection.query(createProcedureQuery, (err, results) => {
      if (err) {
        console.error('Error creating procedure:', err);
      } else {
        console.log('Stored procedure created successfully');
      }

      connection.end();
    });
  });
});