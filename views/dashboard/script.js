document.addEventListener('DOMContentLoaded', function() {
    var complaintForm = document.getElementById('complaint-form');
    var sidebarItems = document.querySelectorAll('.sidebar-item');

    complaintForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var studentId = document.getElementById('student-id').value;
        var roomNumber = document.getElementById('room-number').value;
        var complaintText = document.getElementById('complaint-text').value;
        
        console.log('Complaint Submitted', { studentId, roomNumber, complaintText });
        alert('Complaint submitted!'); // Placeholder for actual submission logic
        
        complaintForm.reset();
    });

    sidebarItems.forEach(function(item) {
        item.addEventListener('click', function() {
            document.querySelector('.sidebar-item.active').classList.remove('active');
            item.classList.add('active');
            // Add more functionality as needed
        });
    });
});
