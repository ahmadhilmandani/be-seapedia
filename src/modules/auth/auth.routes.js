
const { checkToken } = require('../../middleware/checkToken.middleware.js');
const controller = require('./auth.controller.js')
const express = require("express");


const router = express.Router();

router.post('/sign-in', controller.signIn)
router.post('/sign-up', controller.signUp)
router.get('/get-user-info', checkToken, controller.getUserInfo)

module.exports = router;