const User = require("../models/userModel");

// TLDR: checks if a session exists and session contains user's unique ID... if so CONTINUE, else redirect to login page
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        req.session.loginMessage = "You must login to access this page.";
        res.redirect('/login');
    }
}

//if logged in, attach user's obj to the session!
async function isLoggedIn(req, res, next) {
    try 
    {
        if (req.session && req.session.userId) 
        {
            req.session.activeUser = await User.findOne({_id: req.session.userId});
            // vv changes the password into an empty string just in case
            req.session.activeUser.password = "";

            return next();
        }
        else 
        {
            req.session.activeUser = null;

            return next();
        }
    } catch (error) {
        let errorObj = {
            message: "isLoggedIn middleware failed",
            payload: error
        }

        console.log(errorObj);
        res.send("Authorization for login failed! Try again later or contact admin..");
    }
}

async function isUserAdmin(req, res, next)
{
    if (req.session && req.session.userId) 
    {
        //TODO STUB!!

        // req.session.adminUser = await User.findOne({_id: req.session.adminId});
        // vv changes the password into an empty string just in case
        req.session.activeUser.password = "";



        return next();
    }
}

module.exports = {
    requireAuth,
    isLoggedIn
}