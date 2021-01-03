// ************************************************************************** //
//                                                                            //
//                                                        :::      ::::::::   //
//   app.js                                             :+:      :+:    :+:   //
//                                                    +:+ +:+         +:+     //
//   By: hyechoi <hyechoi@student.42seoul.kr>       +#+  +:+       +#+        //
//                                                +#+#+#+#+#+   +#+           //
//   Created: 2020/11/10 15:30:36 by hyechoi           #+#    #+#             //
//   Updated: 2020/11/15 21:29:41 by hyechoi          ###   ########.fr       //
//                                                                            //
// ************************************************************************** //

/*
 **	fs module
 **	http://nodejs.org/api/fs.html
 **	file system.
 */
const fs = require("fs");
var dbFile = "db.json";
var dbDataBuffer = fs.readFileSync(dbFile);
var dbJSON = JSON.parse(dbDataBuffer.toString());

function dbSync() {
  fs.writeFileSync(dbFile, JSON.stringify(dbJSON));
}

const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("GET\t/");
  res.send("HELLo World!");
});

/*
 **	GET /todos/
 */

app.get("/todos/", (req, res) => {
  console.log("GET\t/todos/");
  res.json(dbJSON.todos);
});

/*
 **	GET /todos/:todo_id
 */

app.get("/todos/:todo_id", (req, res) => {
  try {
    var index = dbJSON.todos.findIndex(
      (todo) => todo.id === parseInt(req.params.todo_id)
    );
    if (index < 0) throw new Error("Not Found");
    res.json(dbJSON.todos[index]);
    console.log("GET\t/todos/" + req.params.todo_id);
  } catch (error) {
    res.status(404).send(error);
    console.log("GET\t/todos/" + req.params.todo_id + " => 404 Not Found");
  }
});

/*
 ** POST /todos/
 */

app.post("/todos/", (req, res) => {
  try {
    var payload = {
      id: dbJSON.todos.length + 1,
      content: req.body.content,
      completed: false,
    };
    dbJSON.todos.push(payload);
    res.json(dbJSON.todos[dbJSON.todos.length - 1]);
    dbSync();
    console.log("POST\t/todos/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
    console.log("POST\t/todos/ => 500 Server Error");
  }
});

/*
 **	PATCH /todos/:todo_id
 */

app.patch("/todos/:todo_id", (req, res) => {
  try {
    var index = dbJSON.todos.findIndex(
      (todo) => todo.id === parseInt(req.params.todo_id)
    );
    if (index < 0) throw new Error("shit");
    if (req.body.content !== undefined)
      dbJSON.todos[index]["content"] = req.body.content;
    if (req.body.completed !== undefined)
      dbJSON.todos[index]["completed"] = req.body.completed;
    dbSync();
    res.json(dbJSON.todos[index]);
    console.log("PATCH\t/todos/" + req.params.todo_id);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
    console.log("PATCH\t/todos/" + req.params.todo_id + " => 500 Server Error");
  }
});

/*
 **	DELETE /todos/:todo_id
 */

app.delete("/todos/:todo_id", (req, res) => {
  try {
    var index = dbJSON.todos.findIndex(
      (todo) => todo.id === parseInt(req.params.todo_id)
    );
    if (index < 0) throw new Error("shit");
    dbJSON.todos = dbJSON.todos.filter(
      (todo) => todo.id !== parseInt(req.params.todo_id)
    );
    dbSync();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
    console.log(
      "DELETE\t/todos/" + req.params.todo_id + " => 500 Server Error"
    );
  }
});

app.listen(PORT, () => {
  console.log("Something behind... you have to implement this...!");
  console.log(`Server is running and listening on port ${PORT}!`);
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});
