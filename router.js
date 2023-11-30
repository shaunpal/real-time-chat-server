const express = require('express');
const router = express.Router();

router.get("/api", (req, res) => {
    res.send('Server is running');
    res.end('Hello World!');
})

module.exports = router;