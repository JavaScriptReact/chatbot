const bcrypt = require("bcrypt")

function password(text, options){
    const { method , hash } = options 
    let password = ""
    if(method === "hash"){
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(text, salt)
        password = hash 
        return password 
    }else if(method === "un_hash"){
        const result = bcrypt.compareSync(text, hash)
        password = result 
        return password
    }
}

module.exports = password