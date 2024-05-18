const express = require('express');
const router = express.Router();

// Schema
const Users = require('../models/UserModel.js')

// Controller
const { getUser } = require('../controllers/usersController.js');

router.post('/', getUser);



module.exports = router