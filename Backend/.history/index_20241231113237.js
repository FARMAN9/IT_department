const express = require("express");
const app = express();

// Define a route
app.get("/", (req, res) => {
  res.send("Department of it ");
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
