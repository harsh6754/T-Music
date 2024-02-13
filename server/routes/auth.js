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
            const userExists = await user.findOne({"user_id" : decodeValue.user_id})
            if(!userExists){
                //return res.send("Need to create")
                newUserData(decodeValue,req,res)
            }else{
                return res.send("Need to Update")
            }
        }
    } catch (error) {
        return res.status(505).json({ message: error })
    }

})

const newUserData = async (decodeValue,req,res)=>{
    const newUser = new user({
        name:decodeValue.name,
        email:decodeValue.email,
        imageURL:decodeValue.picture,
        user_id:decodeValue.user_id,
        email_verified:decodeValue.email_verified,
        role:"member",
        auth_time:decodeValue.auth_time
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).send({user:savedUser})
    } catch (error) {
         res.status(400).send({success : false, msg : error})
    }
}

module.exports = router;
