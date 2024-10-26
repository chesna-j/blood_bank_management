document.getElementById('donorBtn').addEventListener('click', function() {
    window.location.href = 'donor.html';
});

document.getElementById('patientBtn').addEventListener('click', function() {
    window.location.href = 'patient.html';
});
// Handle the 'Enter Donor Details' button (assuming it opens a form or another page)
document.getElementById('donorBtn').addEventListener('click', function() {
    window.location.href = 'donor.html';  // Change to the actual donor entry page
});

// Handle the 'View Donors' button
document.getElementById('donorvwbtn').addEventListener('click', function() {
    window.location.href = 'view_donors.html';  // Navigate to view donors page
});
//Donor Form Validation
document.querySelector('form').addEventListener('submit', function(event) {
    const donorName = document.getElementById('donorName').value;
    const mobile = document.getElementById('mobile').value;
    const bloodType = document.getElementById('bloodType').value;

    if (!donorName || !mobile || !bloodType) {
        alert('Please fill out all required fields');
        event.preventDefault(); // Prevent form submission
    }

    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        event.preventDefault();
    }

    if (!['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(bloodType.toUpperCase())) {
        alert('Please enter a valid blood type');
        event.preventDefault();
    }
});
//patient form validation
document.querySelector('form').addEventListener('submit', function(event) {
    const patientName = document.getElementById('patientName').value;
    const mobile = document.getElementById('mobile').value;

    if (!patientName || !mobile) {
        alert('Please fill out all required fields');
        event.preventDefault();
    }

    if (!/^\d{10}$/.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        event.preventDefault();
    }
});


document.getElementById('backButton').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior
    window.location.href = 'index.html';  // Redirect to the index page
});