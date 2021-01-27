const express = require('express');
const MyDetails = require('../controllers')




const router = express.Router();

router.get('/', MyDetails.home);

module.exports = router;


