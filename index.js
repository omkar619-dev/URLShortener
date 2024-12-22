const express = require("express")
const {connectToDB} = require('./connection');
const PORT = 8384;
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
connectToDB("mongodb://localhost:27017/short-url").then(()=>{console.log("MONGODB CONNECTED!");})
app.use(express.json());
app.use('/url',urlRoute);

app.use("/:shortId",async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        },
    });
    return res.redirect(entry.redirectURL);
})

app.listen(PORT,()=>{console.log(`Server started at ${PORT}`)});