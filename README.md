# Hall Management Center (HMC) Software

This software is developed for the IIT students' Hall Management Center (HMC) to automate book-keeping activities associated with its daily operations. Below are the key features and functionalities of the software.

---

## Features and Functionalities

### Student Admission and Room Allotment
- Upon admission, students provide:
  - Note from the admission unit
  - Name, permanent address, contact number, and photograph
- Allotment of:
  - Hall
  - Specific room number
- Generation of an allotment letter for the student.

### Mess Charges and Room Rent
- **Mess Charges**: Mess manager inputs the monthly mess charges for each student.
- **Room Rent**:
  - Varies based on hall (new halls have higher rent than older ones).
  - Twin-sharing rooms have lower rent.
- **Amenities Charges**:
  - Fixed charges for amenities like reading rooms, play rooms, and TV rooms.

### Payment and Collection
- **Student Payments**:
  - Total dues = Mess Charges + Amenity Charges + Room Rent.
  - Students pay their dues online or at the hall office.
- **Mess Manager Collection**:
  - Software computes total mess charges collected from each hall.
  - Generates a printable sheet with total amounts.
  - Printed cheques are issued to mess managers, and signatures are obtained.

### Complaint Management
- Students can raise complaints via a web browser (accessible from rooms or labs).
- Types of complaints:
  - Repair requests (e.g., lights, taps, water filters, room repairs).
  - Staff behavior complaints (e.g., attendants, mess staff).
- Warden actions:
  - View complaints.
  - Post Action Taken Reports (ATR) for each complaint.

### Annual Grant and Expenditure Management
- HMC receives an annual grant for staff salaries and hall upkeep.
- Software supports:
  - Distribution of grants among halls.
  - Wardens entering expenditure details against allocated funds.

### Room Occupancy Management
- **Controlling Warden**:
  - View overall room occupancy.
- **Hall Warden**:
  - View hall-specific occupancy.

### Staff and Salary Management
- **Temporary Staff**:
  - Employees (attendants, gardeners) are paid on a per-day basis.
  - Leave records entered by hall clerks.
- **Monthly Payroll**:
  - Consolidated list of salaries is generated for all staff.
  - Printable cheques issued for salary payments.
- **Staff Management**:
  - Add new staff with details, including daily pay.
  - Remove staff when they leave.

### Expense Management
- Record petty expenses such as:
  - Repairs.
  - Newspaper and magazine subscriptions.
- Generate consolidated account statements for auditing.

### Financial Reports
- Wardens can view real-time statements of accounts.
- Annual consolidated account statements can be generated for:
  - Printing.
  - Approval and audit verification by the institute.

---

## Security
The software incorporates robust security measures to prevent fraud and financial irregularities.

---

## Requirements
- **Round-the-clock Operation**:
  - Supports 24/7 complaint registration and resolution.
- **Multi-user Support**:
  - Students, wardens, clerks, and mess managers access features based on roles.

---

## Outputs
- Allotment letters for students.
- Monthly payment sheets for mess managers.
- Cheques for mess managers and staff salaries.
- Complaint Action Taken Reports (ATR).
- Real-time and annual financial reports.

---

## Development Notes
This software aims to streamline operations and ensure efficiency in HMC's day-to-day activities, providing secure and scalable solutions for hall management.

