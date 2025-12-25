const ImageKit = require('imagekit')


const imagekit =  new ImageKit({
    publicKey : process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey : process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint : process.env.URL_ENDPOINT_IMAGEKIT
});


async function uploadFile(file,filename){
    const response = await imagekit.upload({
        file:file,
        fileName:filename,
        folder:"AI-Social-media-images"
    })
    return response
}


module.exports = uploadFile

