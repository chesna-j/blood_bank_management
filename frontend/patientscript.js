document.addEventListener('DOMContentLoaded', () => {
    fetchBloodBanks(); 
});

function fetchBloodBanks() {
    fetch('http://localhost:3000/blood_banks')
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
                option.value = bloodBank.blood_bank_id;
                option.textContent = bloodBank.blood_bank_name;
                bloodBankSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching blood banks:', error));
}

document.getElementById('patient-form').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const bloodBankId = document.getElementById('bloodBankId').value;
    const patientName = document.getElementById('patientName').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const bloodType = document.getElementById('bloodType').value;
    const hospitalAddress = document.getElementById('hospitalAddress').value;
    const patientAddress = document.getElementById('patientAddress').value;


    const patientData = {
        blood_bank: bloodBankId, // Use the selected blood bank ID
        patient_name: patientName,
        p_phno: mobileNumber,
        blood_type: bloodType,
        h_add: hospitalAddress,
        p_add: patientAddress
    };

    
    console.log('Patient Data:', patientData);


    fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
    .then(response => {
        console.log('Response from patient endpoint:', response); 
        if (!response.ok) {
            throw new Error('Failed to insert patient data: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Inserted Patient ID:', data.id); 
        
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
        console.log('Procedure Call Response:', data); 
    
        
        const bloodType = data.bloodType; 
        const availableUnits = data.availableUnits || 0; // Default to 0 if availableUnits is null or undefined
    
    
        let formattedMessage = '';
        
        if (bloodType) {
            formattedMessage = `Blood Type: ${bloodType} has ${availableUnits} units available in the blood bank.`;
        } else {
            formattedMessage = `No valid blood type available. ${availableUnits} units available in the blood bank.`;
        }
    
        
        document.getElementById('response-message').innerText = formattedMessage;
    })
    
    .catch(error => {
        
        document.getElementById('response-message').innerText = 'Error: ' + error.message;
        console.error('Error details:', error); // Debugging line
    });
});
