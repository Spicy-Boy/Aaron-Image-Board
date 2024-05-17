//module initialization
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const cors = require('cors');

//LOGIN and SESSION Middleware
const session = require('express-session');
require("dotenv").config();

//TO MAKE RENDER WORK vv ~~
const MongoDBSessionStore = require("connect-mongodb-session")(session);
// Initialize MongoDB session store
const store = new MongoDBSessionStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions" // Collection name to store sessions
});
// Catch errors
store.on("error", function(error) {
    console.error(error);
});
//~~

//APP MIDDLEWARE
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));

//turn off dev for final project
app.use(logger("dev"));
// app.use(logger("combined"));

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

/* ~ R O U T E S ~ */
const viewRouter = require("./routes/viewRouter");
app.use("/", viewRouter);

const threadRouter = require("./routes/threadRouter");
app.use("/api/threads", threadRouter);

const userRouter = require("./routes/userRouter");
app.use("/api/users", userRouter);

// NOTE:!!! TODO!!!:::!!  Add an admin auth to this route!!! must have an admin session logged in!!! Omg
const adminRouter = require("./routes/adminRouter");
app.use("/admin", adminRouter);

//WILDCARD! disabled
// const wildecardRouter = require("./routes/wildcardRouter");
// app.use("*", wildcardRouter);

//upload route, CANNED for now
// const uploadRouter = require("./routes/uploadRouter");
// app.use("/api/upload", uploadRouter);

// 80 is OPEN vvv to INTERNET!!! DANGER

// const PORT = 80;

//8080 is for local testing

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    if (PORT == 80)
    {
        console.log('CAUTION: Using port 80!');
        console.log('Open to the internet!');
    }
});

// ^^ DANGER! Open to internet!

//initialize mongoose shenanigans
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', false);
//connect to ye olde database (see .env file for database URI)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("MongoDB Connected");
});