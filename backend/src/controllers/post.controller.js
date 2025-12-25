const postModel = require('../models/post.model')
const captionGeneration = require('../services/ai.service')
const uploadFile = require('../services/storage.service')
const {v4:uuidv4} = require('uuid')

async function createPostController(req,res){
    
    const file = req.file;
    console.log('File received',file)
    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')


    const caption = await captionGeneration(base64ImageFile)

    // res.json({
    //     caption
    // })

    const result = await uploadFile(file.buffer,`${uuidv4()}`)

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user:  req.user._id
    })
    
    res.status(201).json({
        message:"Post created Successfully",
        post
    })
}

module.exports = {createPostController}