//module initialization
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");

//LOGIN and SESSION Middleware
const session = require('express-session');
require("dotenv").config();

//APP MIDDLEWARE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

//LOGIN SESSION Middleware
app.use(session(
    {
        secret: process.env.SECRET_SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        cookies: {
            maxAge: 24*60*60*1000 // 24 hours before logged out automagically
        }
    }
));

//ROUTES!
const viewRouter = require("./routes/viewRouter");
app.use("/", viewRouter);

const threadRouter = require("./routes/threadRouter");
app.use("/api/threads", threadRouter);

//TODO: posts
//vv post creation not ENABLED yet!
// const postRouter = require("./routes/postRouter");
// app.use("api/posts", postRouter);

//Turn on the app
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//initialize mongoose shenanigans
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);
//connect to ye olde database (see .env file for database URI)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("MongoDB Connected")
});