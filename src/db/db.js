const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Connected  Successfully DB")
    })
    .catch(err=>{
        console.log("Error occurred in connection of DB", err)
    })
}

module.exports =connectDB