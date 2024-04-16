// for Dashboard page along with others
const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

const userDetailsDiv = document.getElementById('user-name');
const user = fetch('/api/user').then(res => res.json()).then(data => {
    const { rollNumber, name } = data;
    
    const text = `<p>Welcome, ${name}</p><p>Roll Number: ${rollNumber}</p>`;
    userDetailsDiv.innerHTML = text;
})

function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const currentDateTime = now.toLocaleString('en-US', options);
    const formattedDateTime = currentDateTime.replace(/AM|PM/, match => match.toLowerCase());
    document.querySelector('#datetime').textContent = formattedDateTime;
  }
  setInterval(updateDateTime, 1000);
// for logout
  const logoutButton = document.getElementById('logout');
  logoutButton.addEventListener('click',async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })});

// for fetchihng user Name and roll number separately
const userRoll = document.getElementById('rollNumber');
fetch('/api/user')
    .then(res => res.json())
    .then(data => {
        userRoll.value = data.rollNumber; // Set the value of the input field
    });

//roll number
const Roll = document.getElementById('roll');
fetch('/api/user')
  .then(res => res.json())
  .then(data => {
    const { rollNumber } = data;
    const text = `${rollNumber}`;
    Roll.textContent = text;
  })
  .catch(error => {
    console.error('Error fetching roll number:', error);
  });

//name
const userName = document.getElementById('userName');

fetch('/api/user')
  .then(res => res.json())
  .then(data => {
    const { name } = data;
    const text = `${name}`;
    userName.textContent = text;
  })
  .catch(error => {
    console.error('Error fetching user name:', error);
  });

  // Fetch Room Data and Populate Table
function fetchRoomData() {
  const roomTableBody = document.querySelector("#roomTable tbody");

  fetch('/api/room/')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          roomTableBody.innerHTML = ''; // Clear existing rows
          data.forEach(room => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${room.roomNumber}</td>
                  <td>${room.roomType}</td>
                  <td>${room.currentOccupancy || 0}/${room.roomType === 'single' ? 1 : 2}</td>
                  <td>${room.currentOccupancy < (room.roomType === 'single' ? 1 : 2) ? 'Available' : 'Occupied'}</td>
              `;
              roomTableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching room data:', error);
          roomTableBody.innerHTML = `<tr><td colspan="4">Failed to load data</td></tr>`;
      });
}

document.addEventListener('DOMContentLoaded', fetchRoomData);

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
  fetchComplaints();
});

// Fetch all complaints from the server
async function fetchComplaints() {
  try {
      const response = await fetch('/api/complaints');
      if (response.ok) {
          const complaints = await response.json();
          displayComplaints(complaints);
      } else {
          throw new Error(`Failed to fetch complaints: ${response.status} ${response.statusText}`);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Error loading complaints: ' + error.message);
  }
} 

// Display all complaints on the page
function displayComplaints(complaints) {
  const container = document.getElementById('complaints-container');
  container.innerHTML = ''; // Clear existing cards
  complaints.forEach(complaint => {
      const card = document.createElement('div');
      card.className = 'complaint-card';
      card.innerHTML = `
          <p><strong>Type:</strong> ${complaint.complaintType}</p>
          <p><strong>Details:</strong> ${complaint.complaintText}</p>
          <button onclick="updateComplaintStatus('{{complaintId}}', true)">Resolve</button>
              ${complaint.resolved ? 'Resolved' : 'Unresolved'}
          </button>
      `;
      container.appendChild(card);
  });
}

// Toggle the status of a complaint

function updateComplaintStatus(complaintId, newStatus) {
  fetch(`/api/complaints/${complaintId}`, {  // Your endpoint needs to capture complaintId dynamically
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resolved: newStatus })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Update Success:', data);
      fetchComplaints(); // Optionally refresh the list or update the UI as needed
  })
  .catch(error => {
      console.error('Error updating complaint:', error);
  });
}


function toggleStatus(element, complaintId, resolved) {
  const newStatus = !resolved; // Toggle the boolean status
  element.innerText = newStatus ? 'Resolved' : 'Unresolved';
  element.style.backgroundColor = newStatus ? 'green' : 'red';
  
  // Update complaint status on the server
  fetch(`/api/complaints/${complaintId}`, {
      method: 'PUT', // Use PUT method for updates
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resolved: newStatus })
  }).then(response => {
      return response.json();
  }).then(data => {
      console.log('Status updated successfully', data);
  }).catch(error => {
      console.error('Error updating status:', error);
  });
}