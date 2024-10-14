document.addEventListener('DOMContentLoaded', () => {
    fetchBloodBanks(); // Fetch blood banks when the page loads
});

function fetchBloodBanks() {
    fetch('http://localhost:3000/blood_banks') // Adjust your server URL
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const bloodBankSelect = document.getElementById('bloodBankId');
            data.forEach(bloodBank => {
                const option = document.createElement('option');
                option.value = bloodBank.blood_bank_id; // Set the value as the ID
                option.textContent = bloodBank.blood_bank_name; // Set the display text as the name
                bloodBankSelect.appendChild(option); // Add the option to the dropdown
            });
        })
        .catch(error => console.error('Error fetching blood banks:', error));
}

document.getElementById('patient-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const bloodBankId = document.getElementById('bloodBankId').value; // Get the selected blood bank ID
    const patientName = document.getElementById('patientName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const bloodType = document.getElementById('bloodType').value;
    const hospitalAddress = document.getElementById('hospitalAddress').value;
    const patientAddress = document.getElementById('patientAddress').value;

    // Prepare data to send for patient registration
    const patientData = {
        blood_bank: bloodBankId, // Use the selected blood bank ID
        patient_name: patientName,
        p_phno: mobileNumber,
        blood_type: bloodType,
        h_add: hospitalAddress,
        p_add: patientAddress
    };

    // Debugging: Log patient data before sending
    console.log('Patient Data:', patientData);

    // Send data to the backend to insert into the patient table
    fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
    .then(response => {
        console.log('Response from patient endpoint:', response); // Debugging line
        if (!response.ok) {
            throw new Error('Failed to insert patient data: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Inserted Patient ID:', data.id); // Debugging line
        
        // Prepare data to call the stored procedure
        const procedureData = {
            no: bloodBankId, // Use the selected blood bank ID
            value: bloodType // Use the blood type
        };

        // Call the stored procedure
        return fetch('http://localhost:3000/call-procedure', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(procedureData)
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to call the procedure: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Display success message
        document.getElementById('response-message').innerText = 'Patient registered and procedure executed successfully! Result: ' + JSON.stringify(data);
    })
    .catch(error => {
        // Display error message
        document.getElementById('response-message').innerText = 'Error: ' + error.message;
        console.error('Error details:', error); // Debugging line
    });
});
