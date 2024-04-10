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

        res.json({
            message: "register new user success",
            payload: newUser
        });

    } catch (error) {
        let errorObj = {
            message: "registerNewUser failed",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    registerNewUser
};