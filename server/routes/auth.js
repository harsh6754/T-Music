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
            return res.status(505).json({ message: "Un-Authorized" })
        } else {
            //return res.status(200).json(decodeValue)

            //Check User exit or Not
            const userExists = await user.findOne({ "user_id": decodeValue.user_id })
            if (!userExists) {
                //return res.send("Need to create")
                newUserData(decodeValue, req, res)
            } else {
                //return res.send("Need to Update")
                updateNewUserData(decodeValue, req, res)
            }
        }
    } catch (error) {
        return res.status(505).json({ message: error })
    }

})

const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
        name: decodeValue.name,
        email: decodeValue.email,
        imageURL: decodeValue.picture,
        user_id: decodeValue.user_id,
        email_verified: decodeValue.email_verified,
        role: "member",
        auth_time: decodeValue.auth_time
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).send({ user: savedUser })
    } catch (error) {
        res.status(400).send({ success: false, msg: error })
    }
}

const updateNewUserData = async (decodeValue, req, res) => {
    const filter = { user_id: decodeValue.user_id };

    const options = {
        upsert: true,
        new: true
    };
    try {
        const result = await user.findOneAndUpdate(
            filter,
            { auth_time: decodeValue.auth_time },
            // console.log(auth_time),
            options
        );
        res.status(200).send({ user: result })
    } catch (error) {
        res.status(400).send({ success: false, msg: error })
    }
}

router.get("/getAllUsers", async (req, res) => {
    try {
        const options = {
            sort: {
                createdAt: 1,
            },
        };

        const cursor = await user.find({}, {}, options).lean();
        if (cursor && cursor.length > 0) {
            res.status(200).send({ success: true, data: cursor });
        } else {
            res.status(404).send({ success: false, msg: "Data not found" });
        }
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
});



module.exports = router;
