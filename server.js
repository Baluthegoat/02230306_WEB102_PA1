const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;

  switch (url) {
    case '/todos':
      handleTodos(req, res);
      break;
    case '/todos/:id':
      handleTodoById(req, res);
      break;
    default:
      res.statusCode = 404;
      res.end('Not Found');
  }
});

const handleTodos = (req, res) => {
  if (req.method === 'GET') {
    fs.readFile('todos.json', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      const todos = JSON.parse(data);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(todos));
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const todo = JSON.parse(body);
      fs.readFile('todos.json', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }

        const todos = JSON.parse(data);
        todos.push(todo);
        fs.writeFile('todos.json', JSON.stringify(todos), err => {
          if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
          }

          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(todo));
        });
      });
    });
  }
};

const handleTodoById = (req, res) => {
  const id = req.params.id;

  if (req.method === 'GET') {
    fs.readFile('todos.json', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      const todos = JSON.parse(data);
      const todo = todos.find(todo => todo.id === parseInt(id));
      if (!todo) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(todo));
    });
  } else if (req.method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const todo = JSON.parse(body);
      fs.readFile('todos.json', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }

        const todos = JSON.parse(data);
        const index = todos.findIndex(todo => todo.id === parseInt(id));
        if (index === -1) {
          res.statusCode = 404;
          res.end('Not Found');
          return;
        }

        todos[index] = todo;
        fs.writeFile('todos.json', JSON.stringify(todos), err => {
          if (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(todo));
        });
      });
    });
  } else if (req.method === 'DELETE') {
    fs.readFile('todos.json', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }

      const todos = JSON.parse(data);
      const index = todos.findIndex(todo => todo.id === parseInt(id));
      if (index === -1) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }

      todos.splice(index, 1);
      fs.writeFile('todos.json', JSON.stringify(todos), err => {
        if (err) {
          res.statusCode = 500;
          res.end('Internal Server Error');
          return;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Todo deleted successfully' }));
      });
    });
  }
};

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});