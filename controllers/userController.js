const User = require("../models/userModel");
const argon2 = require("argon2");

async function registerNewUser(req, res) 
{
    try{
        let userPassword = req.body.password;

        //use argon2 to encrypt the plain string password
        const encryptedPassword = await argon2.hash(userPassword);

        //the encrypted password is added to the DB, not PLAIN TEXT
        let newUser = {
            username: req.body.username,
            password: encryptedPassword
        }

        await User.create(newUser);

        res.redirect("/");

        // res.json({
        //     message: "register new user success",
        //     payload: newUser
        // });

    } catch (error) {
        let errorObj = {
            message: "registerNewUser failed",
            payload: error
        }
        console.error(errorObj);
        res.send("Registration failed!");
    }
}

async function loginUser(req, res) 
{
    try{

        const {username, password} = req.body;

        //find the target user based on entered username
        let foundUser = await User.findOne({username});

        //verify the password is correct
        const isCorrectPassword = await argon2.verify(foundUser.password, password);

        if (isCorrectPassword) 
        {
            // if you steal someones _id, you can impersonate them perhaps!
            req.session.userId = foundUser._id;

            return res.redirect('/');
        } else {
            //TODO send parameters for incorrect password redirect to login page
            res.json({
                message: "function excecuted properly.. but",
                payload: "incorrect password! try again"
            });
        }

    } catch (error) {
        let errorObj = {
            message: "loginUser failed",
            payload: error
        }
        console.error(errorObj);
        // res.json(errorObj);
        // TODO: make this a parameter and redirect to login page with error code
        res.send("Login failed somehow!");
    }
}

module.exports = {
    registerNewUser,
    loginUser
};