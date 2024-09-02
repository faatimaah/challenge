const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let issues = [
  { id: 1, title: 'Issue 1', description: 'Description for Issue 1' },
  { id: 2, title: 'Issue 2', description: 'Description for Issue 2' }
];

// Create
app.post('/issues', (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log('Created:', newIssue);
  res.status(201).send(newIssue);
});

// Read
app.get('/issues/:id', (req, res) => {
  const issue = issues.find(i => i.id == req.params.id);
  if (issue) {
    res.send(issue);
  } else {
    res.status(404).send('Issue not found');
  }
});

// Update
app.put('/issues/:id', (req, res) => {
  const id = req.params.id;
  const updatedIssue = req.body;
  issues = issues.map(i => (i.id == id ? updatedIssue : i));
  console.log('Updated:', updatedIssue);
  res.send(updatedIssue);
});

// Delete
app.delete('/issues/:id', (req, res) => {
  const id = req.params.id;
  issues = issues.filter(i => i.id != id);
  console.log('Deleted issue with ID:', id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
