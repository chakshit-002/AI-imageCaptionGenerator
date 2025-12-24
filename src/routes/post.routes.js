const express = require('express')
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../Middlewares/auth.middleware');

const upload = multer({Storage: multer.memoryStorage()})



router.post('/',authMiddleware,upload.single("image"),)

module.exports = router;