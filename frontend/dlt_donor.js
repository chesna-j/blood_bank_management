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
    console.log(`Deleting donor with ID: ${donorId}`); // Log the donor ID being deleted

    // First, delete related records in the blood table
    fetch(`http://localhost:3000/blood/${donorId}`, { method: 'DELETE' }) // Send DELETE request for blood records
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
            document.getElementById('message').textContent = 'An error occurred. Please try again.'; // Generic error message
        });
}
