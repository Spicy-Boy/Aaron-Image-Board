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

        //one of the environmental properties (ADMINS) is basically a whitelist for admins, so name must be confirmed in two places (DB and .env)
        const arrayOfAdmins = process.env.ADMINS;

        const isUserAnAdmin = foundUser.isAdmin && arrayOfAdmins.includes(username);

        if (isCorrectPassword)
        {
            if (isUserAnAdmin)
            {
                // the super duper secret admin key is inscribed into the session, to be checked later :)
                req.session.adminId = process.env.SECRET_ADMIN_KEY;

                return res.redirect('/admin-cavern');
            }
            else
            {
            //TODO send parameters for incorrect admin user redirect to login page
            res.json({
                message: "function excecuted properly.. but",
                payload: "selected account is not an admin"
            });
            }
        }
        else 
        {
            //TODO send parameters for incorrect password redirect to login page
            res.json({
                message: "function excecuted properly.. but",
                payload: "incorrect password! try again"
            });
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