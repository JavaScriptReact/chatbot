const router = require("express").Router()
const UserSchema = require("../../schema/user")
const password_function = require("./password")

router.use("/sign-in" , (req , res , next) => { 
    next()
})

router.post("/sign-in" , (req , res) => {
    const { username , email , password } = req.body 
    UserSchema.find({ $or : [
        {username : username} , 
        {email : email}
    ] } , (err , matched) => { 
        if (err) console.log(err)
        if(matched.length){
            const database_password = matched[0].password
            if(password_function(password , { 
                method : "un_hash" , 
                hash : database_password
            })){
                res.send({ 
                    user : matched[0],
                    message : "Sucessfully signed in"
                })
            }else{ 
                res.send({ 
                    message : "Bad username, email or password"
                })
            }
        }else{ 
            res.send({
                message : "Your account doesn't exist."
            })
        }
    })
})

module.exports = router 