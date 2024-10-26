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

document.getElementById('backButton').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default link behavior
    window.location.href = 'index.html';  // Redirect to the index page
});