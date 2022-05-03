const express = require("express");
const user = require("./routes/user");
const student = require("./routes/student");
const Admin = require("./routes/Admin");
const http = require("http");
const path = require("path");
const session = require("express-session");
const app = express();
const sessionstorage = require("sessionstorage");

const mysql = require("mysql");
const bodyparser = require("body-parser");
const connection = mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "1234",
  database: "studentcouncelling",
});

connection.connect();

global.db = connection;

//relative paths
const pageRouter = require("./routes/pages");
let appRoutes = new pageRouter();

//

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(
  session({
    secret: "application",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30,
    },
  })
);
app.use;

//page router
app.get("/", (req, res, next) =>
  appRoutes.index(req, res, next, {
    profile: sessionstorage.getItem("profile"),
  })
);

app.get("/home", (req, res, next) =>
  appRoutes.home(req, res, next, { profile: sessionstorage.getItem("profile") })
);
app.get("/changepassword", (req, res, next) =>
  appRoutes.changepassword(req, res, next, {
    profile: sessionstorage.getItem("profile"),
  })
);
app.get("/Candidate_profile", (req, res, next) =>
  appRoutes.Candidateprofile(req, res, next)
);
app.get("/Update_info", (req, res, next) =>
  appRoutes.Updateprofile(req, res, next)
);

app.get("/choices_available", (req, res, next) =>
  appRoutes.choicesAvailable(req, res, next)
);
app.get("/filling_choices", (req, res, next) =>
  appRoutes.fillingChoices(req, res, next)
);
app.get("/arrange_choice", (req, res, next) =>
  appRoutes.arrangechoice(req, res, next)
);
app.get("/multiple_deletion", (req, res, next) =>
  appRoutes.multipledeletion(req, res, next)
);

app.get("/logout", user.logout);
app.post("/register", user.register);
app.post("/login", user.login);

app.get("/add/:ID", student.add);
app.get("/delete/:ID", student.delete);
app.get("/Up/:ID", student.Up);
app.get("/Down/:ID", student.Down);

app.get("/delete1/:ID", student.delete1);
app.get("/Up1/:ID", student.Up1);
app.get("/Down1/:ID", student.Down1);

app.post("/update", student.update);
app.post("/search", student.search);
app.post("/searchf", student.searchf);
app.post("/searchr", student.searchr);
app.post("/changepassword", student.changepassword);

app.post("/Allot", Admin.Allot);
app.post("/clearAllot", Admin.clearAllot);
app.get("/Admin", (req, res, next) => appRoutes.Admin(req, res, next));
app.get("/Adminindex", (req, res, next) =>
  appRoutes.Adminindex(req, res, next)
);

app.get("/Update", (req, res, next) => appRoutes.Update(req, res, next));
app.get("/addnew", (req, res, next) => appRoutes.addnew(req, res, next));
app.post("/addnew", Admin.addnew);
app.get("/Updateseat", (req, res, next) =>
  appRoutes.Updateseat(req, res, next)
);
app.post("/Start", Admin.Start);
app.post("/Stop", Admin.Stop);
app.post("/Adminlogin", Admin.Adminlogin);
app.get("/deleteinsti/:ID", Admin.deleteinsti);
app.get("/Updateseatsg/:ID", Admin.Updateseatsg);
app.post("/Updateseats/:ID", Admin.Updateseats);

app.listen(8080, () => {
  console.log("app listening on port 8080");
});

module.exports = app;
