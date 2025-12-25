const express = require('express')
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../Middlewares/auth.middleware');
const postController = require('../controllers/post.controller')
const upload = multer({Storage: multer.memoryStorage()})



router.post('/',authMiddleware,upload.single("image"),postController.createPostController)

module.exports = router;