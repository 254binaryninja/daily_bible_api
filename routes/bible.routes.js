const express = require('express')
const { getResponse,getContent } = require('../controllers/bible.controllers.js');
//const {chatResponse,curatedResponse} = require('../actions/generation.js')

const router = express.Router();

router.post('/',getResponse)
router.post('/daily-content/',getContent)


 module.exports = router