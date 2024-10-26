document.getElementById('deleteButton').addEventListener('click', function() {
    const donorId = document.getElementById('donorId').value; // Get donor ID from input
    if (!donorId) {
        document.getElementById('message').textContent = 'Please enter a valid donor ID.'; // Validate input
        return; // Exit if donor ID is not provided
    }
    deleteDonor(donorId); // Call the delete function directly
});

// Function to delete a donor and their associated blood records
function deleteDonor(donorId) {
    console.log(`Checking for donor with ID: ${donorId}`); // Log the donor ID being checked

    // First, check if the donor exists
    fetch(`http://localhost:3000/donors/${donorId}`)
        .then(response => {
            if (!response.ok) {
                // If the donor does not exist, handle it
                if (response.status === 404) {
                    document.getElementById('message').textContent = 'Donor not present.'; // Donor not found
                } else {
                    throw new Error('Error checking donor presence'); // Handle other errors
                }
                return Promise.reject(); // Exit the chain if donor not found
            }
            // If the donor exists, proceed to delete related records in the blood table
            return fetch(`http://localhost:3000/blood/${donorId}`, { method: 'DELETE' });
        })
        .then(response => {
            // Check if blood records were deleted successfully or if they didn't exist
            if (response.ok || response.status === 404) {
                // Proceed to delete the donor
                return fetch(`http://localhost:3000/donors/${donorId}`, { method: 'DELETE' });
            } else {
                throw new Error('Failed to delete related blood records'); // Handle potential errors
            }
        })
        .then(response => {
            if (response.status === 204) {
                console.log('Donor deleted successfully'); // Log successful deletion
                document.getElementById('message').textContent = 'Donor deleted successfully.'; // Success message
            } else if (response.status === 404) {
                document.getElementById('message').textContent = 'Donor not present.'; // If donor delete failed
            } else {
                throw new Error('Failed to delete donor'); // Handle any other non-204 status
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log error
            if (error.message !== 'Error checking donor presence') {
                document.getElementById('message').textContent = 'An error occurred. Please try again.'; // Generic error message
            }
        });
}
