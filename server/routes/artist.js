const router = require("express").Router();
const artist = require("../models/artist");

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

router.get("/getAll", async (req, res) => {
   try {
      const allArtists = await artist.find().sort({ createdAt: 1 });

      return res.status(200).json({ success: true, artists: allArtists });
   } catch (error) {
      console.error("Error fetching artists:", error);
      return res.status(500).json({ success: false, msg: "Internal server error" });
   }
});

module.exports = router;
