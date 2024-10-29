document.getElementById('donorBtn').addEventListener('click', function() {
    window.location.href = 'donor.html';
});

document.getElementById('patientBtn').addEventListener('click', function() {
    window.location.href = 'patient.html';
});

document.getElementById('donorBtn').addEventListener('click', function() {
    window.location.href = 'donor.html';  
});


document.getElementById('donorvwbtn').addEventListener('click', function() {
    window.location.href = 'view_donors.html'; 
});

document.getElementById('backButton').addEventListener('click', function(event) {
    event.preventDefault();  
    window.location.href = 'index.html'; 
});