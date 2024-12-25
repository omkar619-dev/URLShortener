const User = require("../models/user");
const {v4:uuidv4} = require('uuid')
const {getUser,setUser} = require('../service/auth')

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Create user
    await User.create({ name, email, password });
    return res.render('/')
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Create user
    const user = await User.findOne({  email, password });
    if(!user){
        return res.render('login',{
            error:'Invalid username or password',
        })
    }
    // const sessionId = uuidv4();
    const token = setUser(user);
    // res.cookie('uid',token);
    return res.json({token})
}

module.exports = { handleUserSignUp,handleUserLogin }; // Ensure it's exported correctly
