const http = require("http");
const url = require("url");
const fs = require("fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const path = reqUrl.pathname;
  const method = req.method;

  // Handle different routes and methods
  if (path === "/todos" && method === "GET") {
    // Read todos from JSON file and send as response
    try {
      const data = fs.readFileSync("data.json", "utf8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
