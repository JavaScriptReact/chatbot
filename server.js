require("dotenv").config()
const { createServer } = require("http")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(response => console.log("Connected to datbase"))
.catch(err => console.log("Somethings went wrong via : " , err))

mongoose.connection.on("error" , err => console.log(err))

const app = express()
const server = createServer(app)

app.use(cors({ 
    origin : "localhost:3000" ,
    methods : ["GET" , "POST"]
}))
app.use(bodyParser({ extended : true}))

app.use("/" , (req , res) => { 
    res.send("Welcome there")
})

app.use("/message/post" , require("./routes/POST/message"))
app.use("/user/authenticate" , [
    require("./routes/authentication/sign_up") , 
    require("./routes/authentication/sign_in")
])

const PORT = process.env.PORT || 4000
server.listen(PORT , () => console.log("Server is running on PORT : " , PORT))