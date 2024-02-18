const router = require("express").Router();

const song = require("../models/song");

//Save All Songs

router.post("/save", async (req, res) => {
    const { name, imageURL, songURL, album, artist, language, category } = req.body;

    try {
        const newSong = await song.create({
            name,
            imageURL,
            songURL,
            album,
            artist,
            language,
            category
        });

        return res.status(201).json({ success: true, song: newSong });
    } catch (error) {
        console.error("Error saving song:", error);
        return res.status(400).json({ success: false, msg: "Failed to save Song" });
    }
});

//Get Only One Songs Data

router.get("/getOne/:id", async (req, res) => {
    try {
        const foundSong = await song.findById(req.params.id);
        if (foundSong) {
            return res.status(200).json({ success: true, song: foundSong });
        } else {
            return res.status(404).json({ success: false, msg: " Song not found" });
        }
    } catch (error) {
        console.error("Error fetching song:", error);
        return res.status(500).json({ success: false, msg: "Internal Server error" })
    }
});


//Get All Songs Data

router.get("/getAll", async (req, res) => {
    try {
        const allSong = await song.find().sort({ createdAt: 1 });
        return res.status(200).json({ success: true, song: allSong });
    } catch (error) {
        console.error("Error fetching song:", error);
        return res.status(500).json({ success: false, msg: "Internal Server error" });
    }
});

//Delete Songs Data

router.delete("/delete/:id", async (req, res) => {
    try {
        const filter = { _id: req.params.id }; // Corrected accessing params
        const result = await song.deleteOne(filter);

        if (result.deletedCount > 0) { // Check if any document was deleted
            return res.status(200).send({ success: true, msg: "Data Deleted Successfully", data: result });
        } else {
            return res.status(404).send({ success: false, msg: "Data Not Found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
});

//Update Song Data

router.put("/update/:id", async (req, res) => {
    const songId = req.params.id;
    const { name, imageURL, songURL, album, artist, language, category } = req.body;

    try {
        const updatedSong = await song.findByIdAndUpdate(songId, {
            name,
            imageURL,
            songURL,
            album,
            artist,
            language,
            category
        }, { new: true });

        if (updatedSong) {
            return res.status(200).json({ success: true, song: updatedSong });
        } else {
            return res.status(404).json({ success: false, msg: "Song not found" });
        }
    } catch (error) {
        console.error("Error updating song:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

module.exports = router