const shortid = require('shortid');
const URL = require('../models/url');
const validator = require('validator'); // Install with npm install validator

async function handleGenerateShortURL(req, res) {
    const { URL: inputURL } = req.body;

    // Validate input
    if (!inputURL) {
        return res.status(400).json({ error: "BAD REQUEST, URL IS REQUIRED!" });
    }

    // Validate that the URL is well-formed
    if (!validator.isURL(inputURL)) {
        return res.status(400).json({ error: "INVALID URL PROVIDED!" });
    }

    const shortID = shortid.generate();

    try {
        // Create the shortened URL entry in the database
        await URL.create({
            shortId: shortID,
            redirectURL: inputURL,
            visitHistory: [],
        });

        // Respond with the generated short ID
        return res.render('home',{id: shortID});
        // return res.status(201).json({ id: shortID });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}

async function handleGetAnalytics(req,res){
     const shortId = req.params.shortId;
     const result = await URL.findOne({shortId});
     return res.status(200).json({totalClicks:result.visitHistory.length, analytics:result.visitHistory});
}

module.exports = { handleGenerateShortURL,handleGetAnalytics };
