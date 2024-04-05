const Post = require("../models/postModel");
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

module.exports = {
    renderCatalogPage
};