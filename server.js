// Import Express
const express = require('express');

// Initialize the app
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Sample array to simulate a simple data source
let students = [
  { id: 1, name: 'Alice', age: 21 },
  { id: 2, name: 'Bob', age: 22 },
  { id: 3, name: 'Charlie', age: 23 }
];

// GET route to fetch all students
app.get('/students', (req, res) => {
  res.json(students);
});

// POST route to add a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});