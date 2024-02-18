const router = require("express").Router();
const artist = require("../models/artist");

//All Artist Save
router.post("/save", async (req, res) => {
   const { name, imageURL, twitter, instagram } = req.body;

   try {
      const newArtist = await artist.create({
         name,
         imageURL,
         twitter,
         instagram
      });

      return res.status(201).json({ success: true, artist: newArtist });
   } catch (error) {
      console.error("Error saving artist:", error);
      return res.status(400).json({ success: false, msg: "Failed to save artist" });
   }
});

// Get Only One Artist Data
router.get("/getOne/:id", async (req, res) => {
   try {
      const foundArtist = await artist.findById(req.params.id);

      if (foundArtist) {
         return res.status(200).json({ success: true, artist: foundArtist });
      } else {
         return res.status(404).json({ success: false, msg: "Artist not found" });
      }
   } catch (error) {
      console.error("Error fetching artist:", error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
});

//Get All Artist Data
router.get("/getAll", async (req, res) => {
   try {
      const allArtists = await artist.find().sort({ createdAt: 1 });

      return res.status(200).json({ success: true, artists: allArtists });
   } catch (error) {
      console.error("Error fetching artists:", error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
});

//Delete Artist Data
router.delete("/delete/:id", async (req, res) => {
   try {
      const filter = { _id: req.params.id }; // Corrected accessing params
      const result = await artist.deleteOne(filter);

      if (result.deletedCount > 0) { // Check if any document was deleted
         return res.status(200).send({ success: true, msg: "Data Deleted Successfully" });
      } else {
         return res.status(404).send({ success: false, msg: "Data Not Found" });
      }
   } catch (error) {
      console.error("Error:", error);
      return res.status(500).send({ success: false, msg: "Internal Server Error" });
   }
});

//Update Artist Data
router.put("/update/:id", async (req, res) => {
   const artistId = req.params.id;
   const { name, imageURL, twitter, instagram } = req.body;

   try {
      const updatedArtist = await artist.findByIdAndUpdate(artistId, {
         name,
         imageURL,
         twitter,
         instagram
      }, { new: true });

      if (updatedArtist) {
         return res.status(200).json({ success: true, artist: updatedArtist});
      } else {
         return res.status(404).json({ success: false, msg: "Artist not found" });
      }
   } catch (error) {
      console.error("Error updating artist:", error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
});

module.exports = router;
