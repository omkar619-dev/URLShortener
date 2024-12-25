const express = require('express');
const URL = require("../models/url");
const router = express.Router();

// Define the route
router.get("/", async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", { urls: allurls });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

// Export the router directly
module.exports = router;
