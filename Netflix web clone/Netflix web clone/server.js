require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/dbConnect");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { userService, orderService, menuService } = require("./services");
const pdf = require("html-pdf");
const fs = require("fs");
const moment = require("moment");
const app = express();

const options = {
  origin: "*",
};
app.use(cors(options));

//body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/v1", routes);
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => { res.render("./index.ejs")});
app.get("/signup", (req, res) => { res.render("./signup.ejs")});
app.get("/login", (req, res) => { res.render("./login.ejs")});
app.get("/addMovie", (req, res) => { res.render("./addMovie.ejs");});
app.get("/userdata", async (req, res) => {
  try {
    let user = await userService.getUser();
    res.render("./data.ejs", { message: user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//DB connect
connectDB();

//server
http.createServer(app).listen(process.env.PORT, () => {
  console.log("Server started successfully on port " + process.env.PORT);
});
