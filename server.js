const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React.js build directory
app.use(express.static(path.join(__dirname, 'build')));

// Define your API routes or other server logic here

// Serve the React.js app for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Start the server
const port = process.env.PORT || 4200;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});