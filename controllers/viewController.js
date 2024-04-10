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

        res.render("singleThread", {activeUser: req.session.activeUser});

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
            message: "renderNewUserPage failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
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

        res.render("loginUser"/*, {activeUser: userInfo}*/, {activeUser: req.session.activeUser});
    } catch (error) {
        let errorObj = {

            message: "renderLoginPage failed",
            payload: error

        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    renderCatalogPage,
    renderSingleThreadPage,
    renderRegisterNewUserPage,
    renderLoginPage
};