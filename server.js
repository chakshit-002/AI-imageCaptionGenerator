require('dotenv').config();
const app = require('./src/app')
const connectDB = require('./src/db/db')
connectDB();
app.listen(3000,()=>{
    console.log("MY Server is Running on 3000 port no.")
})