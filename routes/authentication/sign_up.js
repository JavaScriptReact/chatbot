const router = require("express").Router()
const UserSchema = require("../../schema/user")
const password_function = require("./password")

router.use("/sign-up" , ( req , res , next) => { 
    const { username , email } = req.body
    if(!username || !email) console.log("You must define your username")
    UserSchema.find({ $or : [
        { username : username } , 
        { email : email }
    ]} , (err, matched) => { 
        if(err) console.log(err)
        if(matched.length){ 
            console.log("Already logged")
            res.send({ 
                username : username,
                message : "You are already logged. Do you want login."
            })
        }else{ 
            next()
        }
    })
})

router.post("/sign-up" , ( req , res) => { 
    const { username , email , age , profession , password } = req.body 
    if(username && email && age && profession && password){ 
        const user = new UserSchema({ username , email , age , profession , password : password_function(password , { 
            method : "hash"
        })})
        user.save()  
        .then(response => {
           res.json({ 
               user : response , 
               message : "Sucessfully loged"
           })
        })
        .catch(error => {
            console.log("Saving error : " , error )
        })
    }else{ 
        console.log("Bad input data")
    }

})

module.exports = router 