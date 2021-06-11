'use strict';
const express = require('express');
const router = express.Router();  // use for route method
const PractiseController = require('../../controller/practise');

/* ******************************************************* */


router.post('/verifyOtp',PractiseController.verifyOtp);
router.post('/mapFunction',PractiseController.mapFunction);   // modify an array
router.post('/filterFunction',PractiseController.filterFunction);    // filter an array
router.post('/fillFunction',PractiseController.fillFunction);           // fill a static value
router.post('/reverseFunction',PractiseController.reverseFunction);  // reverse an array
router.post('/sortFunction',PractiseController.sortFunction);  // sort an array
router.post('/splitFunction',PractiseController.splitFunction);  // convert string to array and do many more things


// compact function in not exist in js, use alternative function like filter
// router.post('/compactFunction',PractiseController.compactFunction);  // compact function an array -> remove unnessary element




// export router
module.exports = router;