//making our application know we are using express

const express = require("express");
const data = require("./data.json");

const app = express();
const port = 3000;
//Getting the application to use the pug templating engine
app.set("view engine", "pug");
//Getting the application to use a static folder
app.use("/static", express.static("public"));
//Requesting portfolio's index
app.get("/", (req, res) => {
  res.locals.projects = data.projects;
  res.render("index");
});
//Requesting portfolio'sS about
app.get("/about", (req, res) => {
  res.render("about");
});
//Getting the application to run the routes we have requested
app.get("/project/:id", (req, res, next) => {
  const id = req.params.id;
  let project;
  data.projects.map((projectData) => {
    if (id == projectData.id) {
      project = projectData;
      console.log(projectData);
    }
  });
  if (project) {
    console.log("Project found");
    res.locals.project = project;
    res.render("project");
  } else {
    //Getting the application to show an error if page or route isn't able to be found
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  }
});

//Getting the application we are wanting to display an error page if one has occured
app.use((err, req, res, next) => {
  if (err) {
    console.error("Error message:", err.message, "Error status:", err.status);
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
  }
});
//Getting application to run on port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
