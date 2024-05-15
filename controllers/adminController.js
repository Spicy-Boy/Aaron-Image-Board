const Thread = require("../models/threadModel");

// vvv for admin login
const User = require("../models/userModel");
const argon2 = require("argon2");

//basically a login for admins :)
async function createAdminSession(req, res)
{
    try{
        const {username, password} = req.body;

        let foundUser = await User.findOne({username});

        const isCorrectPassword = await argon2.verify(foundUser.password, password);

        const isUserAnAdmin = foundUser.isAdmin;

        if (isCorrectPassword && isUserAnAdmin)
        {
            // the super duper secret admin key is inscribed into the session, to be checked later :)
            req.session.adminId = process.env.SECRET_ADMIN_KEY;

            return res.redirect('/:admin-view');
        }

    } catch (error) {
        let errorObj = {
            message: "CreateAdminSession failed",
            payload: error
        }
        console.error(errorObj);
        // TODO: make this a parameter and redirect to admin login page with error code
        res.send("Creating admin session failed somehow!");
    }
}

async function unlistOneThread(req, res)
{

}

async function deleteOneThread(req, res)
{
    
}

async function pinOneThread(req, res)
{
    
}

async function unlistOnePost(req, res)
{

}

async function deleteOnePost(req, res)
{

}

async function editOnePost(req, res)
{
    
}

module.exports = {
    unlistOneThread,
    deleteOneThread,
    pinOneThread,
    unlistOnePost,
    deleteOnePost,
    editOnePost,
    createAdminSession
};