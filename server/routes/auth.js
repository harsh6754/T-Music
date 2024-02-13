const router = require("express").Router()

router.get("/login", (req,res) => {
    return res.json("Successfully Login with Google")
})

module.exports = router;
