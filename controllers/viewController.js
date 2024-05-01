// const Post = require("../models/postModel");
const Thread = require("../models/threadModel");
const User = require("../models/userModel");

async function renderCatalogPage(req, res)
{
    try{
        //gets all threads
        let results = await Thread.find({});

        //OLD vvv now handled in authMiddleware.js

        // //if user is logged in, send user id data to this page!!
        // console.log('Session object: ',req.session);
        // let userInfo = null;
        // //check if user is logged in by seeing is session contains userId
        // if (req.session.userId) 
        // {
        //     let userId = req.session.userId;
        //     userInfo = await User.findOne({_id: userId});
        //     userInfo.password = "";
        // }
        
        res.render("catalog", {threads: results, activeUser: req.session.activeUser});

    } catch (error) {
        let errorObj = {
            message: "renderCatalogPage failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function renderSingleThreadPage(req, res)
{
    try{
        //gets all threads
        let result = await Thread.findOne({threadNo: req.params.threadNo});

        res.render("singleThread", {thread: result, activeUser: req.session.activeUser, uploadFailure: req.params.uploadFailure});

    } catch (error) {
        let errorObj = {
            message: "renderSingleThreadPage failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function renderRegisterNewUserPage (req, res)
{
    try{
        res.render("registerNewUser", {activeUser: req.session.activeUser});
    } catch (error) {
        let errorObj = {
            message: "renderRegisterNewUserPage failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        res.send("Rendering the login page failed! Contact an admin for support..");
    }
}

async function renderLoginPage (req, res)
{
    try{

        //OLD vvv, user session info now handled in authMiddleware.js
    
        // //if user is logged in, send user id data to this page!!
        // console.log('Session object: ',req.session);
        // let userInfo = null;
        // //check if user is logged in by seeing is session contains userId
        // if (req.session.userId) 
        // {
        //     let userId = req.session.userId;
        //     userInfo = await User.findOne({_id: userId});
        //     userInfo.password = "";
        // }

        res.render("loginUser"/*, {activeUser: userInfo}*/, {activeUser: req.session.activeUser, loginMessage: req.session.loginMessage});
    } catch (error) {
        let errorObj = {
            message: "loginUser failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        res.send("Rendering the login page failed! Contact an admin for support..");
    }
}

async function logoutUser(req, res) 
{
    try{
        //literally destroys the session
        req.session.destroy(err => {
            if (err) 
            {
                console.error("error destroying session:",err);
                res.status(500).json({
                    message: "logout failure",
                    payload: "Error logging out"
                });
            }
            else
            {
                res.redirect("/");
            }
        });
    } catch (error) {
        let errorObj = {
            message: "logoutUser failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        res.send("Logging out failed!");
    }
}

async function renderUserPortal(req, res)
{
    try{
        res.render("userPortal", {activeUser: req.session.activeUser});
    } catch (error) {
        let errorObj = {
            message: "renderUserPortal failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        res.send("Rendering the user portal failed! Contact an admin for support..");
    }
}

async function renderFileNotFoundPage(req, res)
{
    try{
        res.render("fileNotFound", {activeUser: req.session.activeUser});
    } catch (error) {
        let errorObj = {
            message: "renderUserPortal failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        res.send("THE FILE NOT FOUND PAGE FAILED TO LOAD.. how ironic");
    }
}

async function renderErrorPage(req, res)
{
    try{
        res.render("userPortal", {activeUser: req.session.activeUser, message: errorMessage});
    } catch (error) {
        let errorObj = {
            message: "renderErrorPage failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        res.send("THE ERROR PAGE FAILED TO LOAD...! Oh my god!");
    }
}

module.exports = {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage,
    logoutUser,
    renderUserPortal,
    renderFileNotFoundPage,
    renderErrorPage
};