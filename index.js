const http = require("http");

// Create a new server instance
const server = http.createServer((req, res) => {
  // Handle incoming requests here
  res.statusCode = 200; // Set the response status code
  res.setHeader("Content-Type", "text/plain"); // Set the response content type
  res.end("Hello, World!\n"); // Send the response body
});

// Configure the server to listen on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
