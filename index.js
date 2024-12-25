const express = require("express")
const path = require('path');
const {connectToDB} = require('./connection');
const PORT = 8384;
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user")

const URL = require("./models/url");
const app = express();

connectToDB("mongodb://localhost:27017/short-url").then(()=>{console.log("MONGODB CONNECTED!");});
app.set('view engine',"ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/",staticRoute);
app.use('/user',userRoute);

// app.get("/test",async (req,res)=>{
//     const allUrls = await URL.find({})
//     return res.render('home',{
//         urls:allUrls,
//     });
// });
app.use('/url',urlRoute);


app.use("/url/:shortId",async(req,res)=>{
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