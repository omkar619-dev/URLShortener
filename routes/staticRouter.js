const express = require('express');
const router = express.Router();

// Define the route
router.get("/", (req, res) => {
    return res.render("home");
});

// Export the router directly
module.exports = router;
