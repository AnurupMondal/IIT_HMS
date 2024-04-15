// Fetch room data from the server
fetch('/api/rooms')
.then(response => response.json())
.then(rooms => {
    const tableBody = document.querySelector('#roomTable tbody');

    // Clear previous table rows
    tableBody.innerHTML = '';

    // Populate table with room data
    rooms.forEach(room => {
        const row = document.createElement('tr');

        const roomNumberCell = document.createElement('td');
        roomNumberCell.textContent = room.roomNumber;
        row.appendChild(roomNumberCell);

        const roomTypeCell = document.createElement('td');
        roomTypeCell.textContent = room.roomType;
        row.appendChild(roomTypeCell);

        const residentsCell = document.createElement('td');
        residentsCell.textContent = room.students.join(', ') || 'No residents';
        row.appendChild(residentsCell);

        tableBody.appendChild(row);
    });
})
.catch(error => {
    console.error('Error fetching room data:', error);
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
const searchTerm = searchInput.value.toLowerCase();
const tableRows = document.querySelectorAll('#roomTable tbody tr');

tableRows.forEach(row => {
    const roomNumber = row.cells[0].textContent.toLowerCase();
    const roomType = row.cells[1].textContent.toLowerCase();
    const residents = row.cells[2].textContent.toLowerCase();

    if (
        roomNumber.includes(searchTerm) ||
        roomType.includes(searchTerm) ||
        residents.includes(searchTerm)
    ) {
        row.style.display = 'table-row';
    } else {
        row.style.display = 'none';
    }
});
});