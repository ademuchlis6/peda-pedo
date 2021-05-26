const express = require('express');
const router = express.Router();
const cekNIKController = require('../controllers/cekNIKController');
const UserSignUpController = require('../controllers/UserSignUpController');

router.post('/ceknik', cekNIKController.ceknik)
router.post('/signUp', UserSignUpController.signUp)

module.exports = router;
