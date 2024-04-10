const User = require("../models/userModel");

// TLDR: checks if session exists and session contains user's unique ID... if so CONTINUE, else redirect to login page
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
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
            payload: "hi :)"
        }

        console.log(errorObj);
        res.json(errorObj);
    }

}

module.exports = {
    requireAuth,
    isLoggedIn
}