// load module
const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const { engine } = require('express-handlebars');
const members = require("./Members");

// init app
const app = express();

// express handlebars middleware
app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render("home", {
      title: "Member App",
      members: members
    });
});

// init middleware
app.use(logger);

// body parser Middleware (past the data from the body to response in postman)
app.use(express.json());
app.use(express.urlencoded({extended: false})); // handle url encoded data

// route using handlebars
// app.get('/', (req, res) =>
//   res.render('index')
// );

// create some routes
app.get("/home", (req, res) => {
  // res.send("<h1>Hello World!</h1>");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// static folder
//app.use(express.static(path.join(__dirname, "public")));

// use members api
app.use("/api/members", require("./routes/api/members"));

// define port number
const PORT = process.env.PORT || 5000;

// listen to port
app.listen(PORT, () => console.log(`Server Start on port ${PORT}`));
