##Endpoints.

##GET/todos##

Description: Retrieve a list of all todos.

Request Method: GET

Response Status Codes:

200 OK: Successful retrieval of todos.

404 Not Found: No todos found.

![alt text](./assets/get.png)

![alt text](./assets/get2.png)

##POST /todos

Description: Create a new todo.

Request Method: POST

Request Body: JSON object representing the new todo with 

the following properties:

task (string): The task description.

completed (boolean): Indicates whether the task is 

completed.

Response Status Codes:

201 Created: Todo created successfully.

405 Method Not Allowed: Unsupported request method.

![alt text](./assets/post.png)

