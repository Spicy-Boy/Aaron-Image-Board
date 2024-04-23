const Thread = require("../models/threadModel");
//deprecated vvv
// const Post = require("../models/postModel");
const PostNo = require("../models/postNoModel");
const ThreadNo = require("../models/threadNoModel");

//vv required to upload files to proper location
const upload = require("../middlewares/multer");

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

        let postNo = await PostNo.findOne({});
        //TESTER vvv
        postNo.number++;
        console.log('postNo', postNo.number);
        await postNo.save();

        
        let threadNo = await ThreadNo.findOne({});
        //TESTER vvv
        threadNo.number++;
        console.log('threadNo', threadNo.number);
        await threadNo.save();

        const firstPostData = {
            username: req.body.username,
            textContent: req.body.content,
            //img is temporarily a url, no uploading images from pc
            img: req.body.img,
            postNo: postNo.number
        }

        const threadData = {
            title: req.body.title,
            author: req.body.username,
            // add the post's objectid as the first post in the thread's array vv
            posts: [firstPostData],
            threadNo: threadNo.number,
            lastCommentAt: Date.now()
        }
        
        const newThread = await Thread.create(threadData);

        // postNo.number++;
        // await postNo.save();

        console.log('Thread created successfully!');

        // vvv return to home page
        res.redirect("/"+threadNo.number);

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

async function createPostInThread (req, res)
{
    /* ejs from singleThread.ejs
        <%if (uploadFailure) {%>
        <h2 style="color: red">
            SORRY, FAILED TO UPLOAD FILE
        </h2>
        <%}%>
    */
    try{
                
        //get the thread
        let targetThread = await Thread.findOne({threadNo: req.params.threadNo});
        let threadNo = req.params.threadNo;

        //initialize a new post object
        let newPost = {
            username: req.body.username,
            textContent: req.body.content,
            //img is temporarily a url, no uploading images from pc
            img: "",
            postNo: 0
        }

        if (req.body.imgCheckbox === 'on')
        {
            newPost.img = req.body.img;
        }
        else {
            newPost.img = `uploads/${req.file.filename}`;
            // newPost.img = `uploads/${threadNo}/${req.file.filename}`;

            // upload.single('file')(req, res, (error) => { 
            //     if (error)
            //     {
            //         console.error("Error uploading file:", error);
            //         // res.redirect("/"+threadNo+"?uploadFailure=true");
            //     }
            //     else
            //     {
            //     //AARON TEMP COMMENT vv
            //     fileName = req.file.filename;
            //     console.log("Aaron print file:", req.file);
            //     //AARON TEMP REDIRECT to prevent posting while testing!!!
            //     // res.redirect("/"+threadNo+"?uploadFailure=true");
            //     }
            // });
            // // newPost.img = `uploads/${req.params.threadNo}/${fileName}`;
            // console.log('fileName:', fileName);
            // newPost.img = `uploads/${fileName}`;
        }

        let postNo = await PostNo.findOne({});
        postNo.number++;
        //TESTER vvv
        // console.log('postNo', postNo.number);
        newPost.postNo = postNo.number;
        await postNo.save();

        //add new post to thread
        targetThread.posts.push(newPost);
        //save thread with new post to DB
        await targetThread.save();

        // vvv return to the thread
        res.redirect("/"+threadNo);

    } catch (error) {
        let errorObj = {
            message: "createPostInThread failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getAllThreads,
    createOneThread,
    createPostInThread
};