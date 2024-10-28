const employees = [
  {
    "id": 1,
    "name": "Aarav Singh",
    "email": "aarav.singh@example.com",
    "password": "123",
    "team": "Design",
  },
  {
    "id": 2,
    "name": "Isha Verma",
    "email": "isha.verma@example.com",
    "password": "123",
    "team": "Development",
  },
  {
    "id": 3,
    "name": "Riya Gupta",
    "email": "riya.gupta@example.com",
    "password": "123",
    "team": "Marketing",
  },
  {
    "id": 4,
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "password": "123",
    "team": "Web Development",
  },
  {
    "id": 5,
    "name": "Priya Mehta",
    "email": "priya.mehta@example.com",
    "password": "123",
    "team": "Sales",
  }
];

const admin = [
  { "name": "Sam Kumar", "id": 1, "email": "admin@company2.com", "password": "123" },
  { "name": "Sourabh Kumar", "id": 2, "email": "admin@company.com", "password": "123" }
];

localStorage.setItem('adminData', JSON.stringify(admin));
localStorage.setItem('employeesData', JSON.stringify(employees));
