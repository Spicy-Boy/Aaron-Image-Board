const User = require("../models/userModel");

const globalIPState = require('../index');

// TLDR: checks if a session exists and session contains a user's unique ID... if so CONTINUE, else redirect to login page
function requireAuth(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        req.session.loginMessage = "You must login to access this page.";
        res.redirect('/login');
    }
}

//if logged in, attach user's obj to the session!
async function attachActiveUserSession(req, res, next) {
    try 
    {
        if (req.session && req.session.userId) 
        {
            req.session.activeUser = await User.findOne({_id: req.session.userId});

            //yeah, I know session variables are stored server side...
            // vv changes the password into an empty string just in case
            req.session.activeUser.password = "";
            req.session.activeUser.adminId = null;

            return next();
        }
        else 
        {
            // THIS is so important-- if there is no active user (even if it is just null), then page crashes when ejs tries to build it!
            req.session.activeUser = null;

            return next();
        }
    } catch (error) {
        let errorObj = {
            message: "isLoggedIn middleware failed",
            payload: error
        }

        console.log(errorObj);
        res.send("Login failed! Try again later or contact admin..");
    }
}

//only works if an active user is attached to session, see attachActiveUserSession above
async function isUserAdmin(req, res, next)
{
    console.log('Running isUserAdmin check');

    if (req.session.adminId && req.session.activeUser) 
    {
        //check if the adminId registered into the session matches the current admin key set in the environmental variable
        const isAdminIdValid = req.session.adminId === process.env.SECRET_ADMIN_KEY;

        //NOTE! session.adminId is set in createAdminSession inside adminController!

        if (isAdminIdValid)
        {
            //if user has a valid admin session, auth is given to access an admin route
            return next();
        }
        else
        {
            req.session.loginMessage = "You lack the permission to do that...";
            return res.redirect("/login");
        }
    }

    req.session.loginMessage = "O_O";
    return res.redirect("/login")
}


//NOTE: Deprecated
// just use morgan dude... why bother creating this complex mess yourself?
// purpose of this middleware is to log the IP 
// async function logIPConnection(req, res, next)
// {
//     const ip = req.headers['x-real-ip'] || req.connection.remoteAddress;

//     const now = Date.now;

//     if (globalIPState.lastLoggedIp != ip || (now - globalIPState.lastLoggedIpTime) > globalIPState.ipLogWaitTime )
//     {
//         globalIPState.lastLoggedIp = ip;
//         globalIPState.lastLoggedIpTime = now;
//     }

//     return next();
// }

module.exports = {
    requireAuth,
    isLoggedIn: attachActiveUserSession,
    isUserAdmin
}