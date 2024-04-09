// const Post = require("../models/postModel");
const Thread = require("../models/threadModel");

async function renderCatalogPage(req, res)
{
    try{
        //gets all threads
        let results = await Thread.find({});
        
        res.render("catalog", {threads: results});

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
        
        res.render("singleThread", {thread: result});

    } catch (error) {
        let errorObj = {
            message: "renderSingleThreadPage failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    renderCatalogPage,
    renderSingleThreadPage
};