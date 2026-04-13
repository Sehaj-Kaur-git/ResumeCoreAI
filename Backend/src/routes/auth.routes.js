const express = require('express');
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')
const authrouter = express.Router();

/*
    @route POST /api/auth/register
    @description Register a new user
    @access Public
*/
authrouter.post('/register', authController.registerUserController)

/*
    @route POST /api/auth/login
    @description Login a user
    @access Public
*/
authrouter.post('/login', authController.loginUserController)


/*  @route GET /api/auth/logout
    @description clear token from cookie and add token to blacklist
    @access Public
*/
authrouter.get('/logout', authController.logoutUserController)

/*
    @route GET /api/auth/get-me
    @description Get the logged in user's details
    @access Private
*/
authrouter.get('/get-me', authMiddleware.authUser,authController.getMeController)

module.exports = authrouter