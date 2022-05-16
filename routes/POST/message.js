const router = require("express").Router()

router.post("/" , (req, res) => { 
    const { username } = req.body 
    res.send(`Message from ${username}`)
})

module.exports = router 