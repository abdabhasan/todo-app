import http from "http";
import {
  tasks,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./tasks.js";

const server = http.createServer((req, res) => {
  if (req.url === "/tasks.js" && req.method === "GET") {
    // get tasks
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(getTasks()));
  } else if (req.url === "/tasks.js" && req.method === "POST") {
    // creat e task
    let body = "";
    req.on("data", (i) => {
      body += i;
    });

    req.on("end", () => {
      try {
        const task = JSON.parse(body);
        const newTask = createTask(task);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 201;
        res.end(JSON.stringify(newTask));
      } catch (error) {
        res.statusCode = 400;
        res.end("Invalid task data");
      }
    });
  } else if (req.url.startsWith("/tasks/") && req.method === "PUT") {
    //updating task
    const taskId = req.url.split("/")[2];
    let body = "";
    req.on("data", (i) => (body += i));

    req.on("end", () => {
      try {
        const updatedTask = JSON.parse(body);
        const task = updateTask(taskId, updatedTask);
        if (task) {
          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify(task));
        } else {
          res.statusCode = 404;
          res.end("Task not found");
        }
      } catch (err) {
        res.statusCode = 400;
        res.end("Invalid task data");
      }
    });
  } else if (req.url.startsWith("/tasks/") && req.method === "DELETE") {
    // delete task
    const taskId = req.url.split("/")[2];
    const deletedTask = deleteTask(taskId);
    if (deletedTask) {
      res.statusCode = 200;
      res.end("Task deleted successfully");
    } else {
      res.statusCode = 404;
      res.end("Task not found");
    }
  } else {
    // invalid routes
    res.statusCode = 404;
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
