const mongoose = require('mongoose')
async function connection(uri) {
    try{
        mongoose.connect(uri)
            .then(()=>{
                console.log("MongoDB connected...")
            })
    }catch{(err)=>{
        console.log("Error occured during mongoDB connection : ",err)
    }}
}

module.exports = connection;