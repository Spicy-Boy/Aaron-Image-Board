const Thread = require("../models/threadModel");
const Post = require("../models/postModel");

async function getAllThreads(req, res)
{
    try{
        //gets all threads and send it as a JSON
        let results = await Thread.find({});
        
        res.json({
            message: "SUCCESS!",
            payload: results
        });

    } catch (error) {
        let errorObj = {
            message: "getAllThreads failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function createOneThread(req, res)
{
    try{

        const postData = {
            username: req.body.username,
            textContent: req.body.content,
            // vvv TEMP IMG SRC
            img: "../public/images/larry.jpg",
            // vvv TEMP needs to be figured out
            thread: null,
            replyingTo: null,
        }

        const newPost = await Post.create(postData);

        const threadData = {
            title: req.body.title,
            author: req.body.username,
            // add the post's objectid as the first post in the thread's array vv
            posts: [newPost._id]
        }

        const newThread = await Thread.create(threadData);

        //add the thread's object id to the post
        newPost.thread = newThread._id;

        await newThread.save();

        console.log('Thread created successfully!');

        // vvv return to home page
        res.redirect("/");

        // res.json({
        //     message: "SUCCESS!",
        //     payload: results
        // });

    } catch (error) {
        let errorObj = {
            message: "createOneThread failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getAllThreads,
    createOneThread
};