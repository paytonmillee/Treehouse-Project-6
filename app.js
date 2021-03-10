//making our application know we are using express
const express = require("express");
const data = require("./data.json");
const app = express();

//Getting the application to use the pug templating engine
app.set("view engine", "pug");
//Getting the application to use a static folder
app.use("/static", express.static("public"));

//Requesting portfolio's index
app.get("/", (req, res) => {
  res.locals.projects = data.projects;

  res.render("index");
});

//Requesting portfolio's about
app.get("/about", (req, res) => {
  res.render("about");
});

//Getting the application to return a requested project
app.get("/project/:id", (req, res, next) => {
  let id = req.params.id;
  let project = null;
  data.projects.map((projectData) => {
    if (projectData.id == id) {
      project = projectData;
    }
  });

  if (project) {
    res.locals.project = project;
    res.render("project");
  } else {
    next();
  }
});

// 404 Error Handler

app.use((req, res, next) => {
  const error = new Error("Page not found.");
  error.status = 404;
  console.log(`${error.message} status code: ${error.status}`);
  res.locals.error = error;
  res.render("error");
  next();
});

//Global Error Handler

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  console.log(`${err.message} status code: ${err.status}`);
  res.locals.error = err;
  res.render("error");
});

let port = 3000;
app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});
