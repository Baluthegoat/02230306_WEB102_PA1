const http = require("http");
const url = require("url");
const fs = require("fs");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // Reading data from JSON file
  let todos = JSON.parse(fs.readFileSync("data.json", "utf8"));

  // Handling different routes and methods
  switch (path) {
    case "/todos":
      switch (method) {
        case "GET":
          // Listing all todos
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(todos));
          break;
        case "POST":
          // Creating a new todo
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            const todo = JSON.parse(body);
            todo.id = todos.length + 1; // Assigning a unique ID
            todos.push(todo);
            // Writing data back to JSON file
            fs.writeFileSync("data.json", JSON.stringify(todos), "utf8");
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(todo));
          });
          break;
        default:
          res.writeHead(405); // Method Not Allowed
          res.end("Method Not Allowed");
      }
      break;
    default:
      // Handling /todos/:id route
      if (path.startsWith("/todos/")) {
        const todoId = parseInt(path.split("/")[2]);
        const todo = todos.find((t) => t.id === todoId);

        if (!todo) {
          res.writeHead(404);
          res.end("Todo not found");
        } else {
          switch (method) {
            case "GET":
              // Getting a single todo by ID
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(todo));
              break;
            case "PUT":
              // Updating a todo by ID
              let body = "";
              req.on("data", (chunk) => {
                body += chunk.toString();
              });
              req.on("end", () => {
                const updatedTodo = JSON.parse(body);
                Object.assign(todo, updatedTodo);
                // Writing data back to JSON file
                fs.writeFileSync("data.json", JSON.stringify(todos), "utf8");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(todo));
              });
              break;
            case "PATCH":
              // Partially updating a todo by ID
              let patchBody = "";
              req.on("data", (chunk) => {
                patchBody += chunk.toString();
              });
              req.on("end", () => {
                const patchData = JSON.parse(patchBody);
                Object.assign(todo, patchData);
                // Writing data back to JSON file
                fs.writeFileSync("data.json", JSON.stringify(todos), "utf8");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(todo));
              });
              break;
            case "DELETE":
              // Deleting a todo by ID
              const index = todos.indexOf(todo);
              todos.splice(index, 1);
              // Writing data back to JSON file
              fs.writeFileSync("data.json", JSON.stringify(todos), "utf8");
              res.writeHead(204);
              res.end();
              break;
            default:
              res.writeHead(405); // Method Not Allowed
              res.end("Method Not Allowed");
          }
        }
      } else {
        res.writeHead(404);
        res.end("Tashi is here");
      }
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
