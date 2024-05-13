// Admin Router: routes admin commands related to editing and deleting posts (and their respecting images) from the database
//ALSO concerns the banning of ips and users

const router = require("express").Router();
// const multer = require('multer');

const {
    deleteOneThread
} = require("../controllers/adminController");