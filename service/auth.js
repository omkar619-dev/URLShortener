// to store the session id with the object
// const sessionIdToUserMap = new Map();
// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }


const jwt = require('jsonwebtoken');
const secret = "Omkar@123#";
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    },
    secret);
}

function getUser(token){
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        return null;
    }
    
    
}

module.exports = {getUser,setUser};