document.getElementById('deleteButton').addEventListener('click', function() {
    const donorId = document.getElementById('donorId').value; 
    if (!donorId) {
        document.getElementById('message').textContent = 'Please enter a valid donor ID.';
        return; 
    }
    deleteDonor(donorId); 
});

function deleteDonor(donorId) {
    console.log(`Checking for donor with ID: ${donorId}`); 

    
    fetch(`http://localhost:3000/donors/${donorId}`)
        .then(response => {
            if (!response.ok) {
                
                if (response.status === 404) {
                    document.getElementById('message').textContent = 'Donor not present.'; 
                } else {
                    throw new Error('Error checking donor presence'); 
                }
                return Promise.reject(); 
            }
            // If the donor exists, then deletion
            return fetch(`http://localhost:3000/blood/${donorId}`, { method: 'DELETE' });
        })
        .then(response => {
            // blood dlt then donor dlt
            if (response.ok || response.status === 404) {
                // donor deletion
                return fetch(`http://localhost:3000/donors/${donorId}`, { method: 'DELETE' });
            } else {
                throw new Error('Failed to delete related blood records'); 
            }
        })
        .then(response => {
            if (response.status === 204) {
                console.log('Donor deleted successfully'); 
                document.getElementById('message').textContent = 'Donor deleted successfully.'; 
            } else if (response.status === 404) {
                document.getElementById('message').textContent = 'Donor not present.'; 
            } else {
                throw new Error('Failed to delete donor'); 
            }
        })
        .catch(error => {
            console.error('Error:', error); 
            if (error.message !== 'Error checking donor presence') {
                document.getElementById('message').textContent = 'An error occurred. Please try again.'; 
            }
        });
}
