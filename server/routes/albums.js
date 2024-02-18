const router = require("express").Router();

const album = require("../models/album");

//Save All Albums
router.post("/save", async (req, res) => {
    const { name, imageURL } = req.body;

    try {
        const newAlbum = await album.create({
            name,
            imageURL,
        });

        return res.status(201).json({ success: true, album: newAlbum });
    } catch (error) {
        console.error("Error saving album:", error);
        return res.status(400).json({ success: false, msg: "Failed to save Album" });
    }
});

// Get Only One Album Data
router.get("/getOne/:id", async (req, res) => {
    try {
        const foundAlbum = await album.findById(req.params.id);

        if (foundAlbum) {
            return res.status(200).json({ success: true, album: foundAlbum });
        } else {
            return res.status(404).json({ success: false, msg: "Album not found" });
        }
    } catch (error) {
        console.error("Error fetching album:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

//Get All Albums Data
router.get("/getAll", async (req, res) => {
    try {
        const allAlbum = await album.find().sort({ createdAt: 1 });

        return res.status(200).json({ success: true, album: allAlbum });
    } catch (error) {
        console.error("Error fetching album:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

//Delete Albums Data
router.delete("/delete/:id", async (req, res) => {
    try {
        const filter = { _id: req.params.id }; // Corrected accessing params
        const result = await album.deleteOne(filter);

        if (result.deletedCount > 0) { // Check if any document was deleted
            return res.status(200).send({ success: true, msg: "Data Deleted Successfully", data : result });
        } else {
            return res.status(404).send({ success: false, msg: "Data Not Found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
});

//Update Album Data
router.put("/update/:id", async (req, res) => {
    const albumId = req.params.id;
    const { name, imageURL } = req.body;

    try {
        const updatedAlbum = await album.findByIdAndUpdate(albumId, {
            name,
            imageURL
        }, { new: true });

        if (updatedAlbum) {
            return res.status(200).json({ success: true, album: updatedAlbum });
        } else {
            return res.status(404).json({ success: false, msg: "Album not found" });
        }
    } catch (error) {
        console.error("Error updating album:", error);
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
});


module.exports = router