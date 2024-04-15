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