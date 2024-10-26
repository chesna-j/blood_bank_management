function deleteDonor(donorId) {
    console.log(`Deleting donor with ID: ${donorId}`);

    // First, delete related records in the blood table
    fetch('http://localhost:3000/blood/${donorId}', { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                // If blood records were deleted, proceed to delete the donor
                return fetch('http://localhost:3000/donors/${donorId}', { method: 'DELETE' });
            } else {
                return Promise.reject('Failed to delete related blood records');
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Donor deleted successfully');
                fetchDonors(); // Refresh the list after deletion
            } else {
                console.error('Failed to delete donor:', response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
}