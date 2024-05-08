const Thread = require("../models/threadModel");
//deprecated vvv
// const Post = require("../models/postModel");
const PostNo = require("../models/postNoModel");
const ThreadNo = require("../models/threadNoModel");

const sharp = require('sharp');

//vv required to upload files to proper location
const upload = require("../middlewares/multer");

async function getAllThreads(req, res)
{
    try {
        //gets all threads and send it as a JSON
        let results = await Thread.find({});
        
        res.json({
            message: "SUCCESS!",
            payload: results
        });

    } catch (error) {
        console.error("getAllThreads failed:",error);

        return res.send("ERROR getting all threads! Please try again later..");
    }
}

//find a single thread in the database by its thread number (sent in request body)
async function getOneThread(req, res)
{
    try {
        let results = await Thread.findOne({threadNo: req.params.threadNo});

        res.json({
            message: "SUCCESS!",
            payload: results
        });
    } catch (error) {
        console.error("getOneThread failed:",error);

        return res.send("ERROR finding specified thread! Please try again later..");
    }
}

//create a thread and a first comment, attach comment to thread
async function createOneThread(req, res)
{
    try{

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
        else if (req.file)
        {
            newPost.img = `/uploads//${req.file.filename}`;
            // vvv still figuring out how to get op images into their respective post folder (that doesnt eeven exist yet!!)
            // newPost.img = `/uploads/${req.params.threadNo}/${req.file.filename}`;
            newPost.imgSize = Math.floor(((req.file.size / 1024) * 100) /100);
            newPost.imgFileType = req.file.mimetype;

            try {
                const imgMetadata = await sharp(req.file.path).metadata();
                newPost.imgWidth = imgMetadata.width;
                newPost.imgHeight = imgMetadata.height;
            } catch (error)
            {
                console.error("Error processing image metadata:",error);
                return res.status(500).send("Error processing image.. is it an accepted file type?");
            }
        }
        else 
        {
            newPost.img = ""; //leave it blank if no url or file attached to post
        }
        
        let postNo = await PostNo.findOne({});
        //TESTER vvv
        postNo.number++;
        console.log('postNo', postNo.number);
        newPost.postNo = postNo.number;

        let threadNo = await ThreadNo.findOne({});
        //TESTER vvv
        threadNo.number++;
        console.log('threadNo', threadNo.number);

        const threadData = {
            title: req.body.title,
            author: req.body.username,
            // add the post's objectid as the first post in the thread's array vv
            posts: [newPost],
            threadNo: threadNo.number,
            lastCommentAt: Date.now()
        }

        const newThread = await Thread.create(threadData);
        await postNo.save();
        await threadNo.save();

        console.log('Thread created successfully!');

        // vvv return to home page
        res.redirect("/thread/"+threadNo.number);

        // res.json({
        //     message: "SUCCESS!",
        //     payload: results
        // });
    } catch (error) {
        console.error("createOneThread failed:",error);

        return res.send("ERROR creating a thread! Please try again later..");
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
        // let threadNo = req.params.threadNo;

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
        else if (req.file)
        {
            newPost.img = `/uploads/${req.params.threadNo}/${req.file.filename}`;
            newPost.imgSize = Math.floor(((req.file.size / 1024) * 100) /100);
            newPost.imgFileType = req.file.mimetype;

            try {
                const imgMetadata = await sharp(req.file.path).metadata();
                newPost.imgWidth = imgMetadata.width;
                newPost.imgHeight = imgMetadata.height;
            } catch (error)
            {
                console.error("Error processing image metadata:",error);
                return res.status(500).send("Error processing image");
            }
        }
        else 
        {
            newPost.img = ""; //leave it blank if no url or file attached to post
        }

        let postNo = await PostNo.findOne({});
        postNo.number++;
        //TESTER vvv
        // console.log('postNo', postNo.number);
        newPost.postNo = postNo.number;

        //add new post to thread
        targetThread.posts.push(newPost);
        //save thread with new post to DB
        await targetThread.save();
        await postNo.save();

        // vvv return to the thread
        res.redirect("/thread/"+req.params.threadNo+"/#bottom");

        //tester vv
        // res.send(req.file);

    } catch (error) {
        console.error("createPostInThread failed:",error);

        return res.send("ERROR creating a post! Please try again later..");
    }
}

module.exports = {
    getAllThreads,
    createOneThread,
    createPostInThread,
    getOneThread
};