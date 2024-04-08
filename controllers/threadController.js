const Thread = require("../models/threadModel");
//deprecated vvv
// const Post = require("../models/postModel");
const PostNo = require("../models/postNoModel");
const ThreadNo = require("../models/threadNoModel");

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

//create a thread and a first comment, attach comment to thread
async function createOneThread(req, res)
{
    try{

        //TESTER vvv
        console.log(PostNo.find({}));

        let postNo = await PostNo.find({});
        let threadNo = await ThreadNo.find({});

        const firstPostData = {
            username: req.body.username,
            textContent: req.body.content,
            //img is temporarily a url, no uploading images from pc
            img: req.body.img,
            postNo: 13
        }

        const threadData = {
            title: req.body.title,
            author: req.body.username,
            // add the post's objectid as the first post in the thread's array vv
            posts: [firstPostData],
            threadNo: threadNo.number
        }
        
        const newThread = await Thread.create(threadData);

        postNo.number++;

        await postNo.save();

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