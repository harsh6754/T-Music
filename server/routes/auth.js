const router = require("express").Router()

const user = require("../models/user")


const admin = require("../config/firebase.config")


router.get("/login", async (req, res) => {
    //return res.json("Successfully Login with Google")
    //return res.send(req.headers.authorization)
    if (!req.headers.authorization) {
        return res.status(500).send({ message: "Invalid Token" })
    }
    const token = req.headers.authorization.split(" ")[1];
    //return res.send(token);
    try {
        const decodeValue = await admin.auth().verifyIdToken(token)
        if (!decodeValue) {
            return res.status(505).json({ message: "Un-Authorized"})
        }else{
            //return res.status(200).json(decodeValue)

            //Check User exit or Not

        }
    } catch (error) {
        return res.status(505).json({ message: error })
    }

})

module.exports = router;
