const router = require("express").Router();

//our artist model
const artist = require("../models/artist");


router.post("/save", async (req, res) => {
   // return res.json("getting all artist")
   const newArtist =  artist(
      {
         name: req.body.name,
         imageURL: req.body.imageURL,
         twitter: req.body.twitter,
         instagram: req.body.instagram,
      }
   )
   try {
      const savedArtist = await newArtist.save();
      return res.status(200).send({ success: true, artist: savedArtist });
   } catch (error) {
      return res.status(400).send({ success: false, msg: error });
   }
})

module.exports = router


// const router = require("express").Router();
// const Artist = require("../models/artist");

// router.post("/save", async (req, res) => {
//    try {
//       const newArtist = new Artist({
//          name: req.body.name,
//          imageURL: req.body.imageURL,
//          twitter: req.body.twitter,
//          instagram: req.body.instagram,
//       });

//       const savedArtist = await newArtist.save();
//       return res.status(200).json({ success: true, artist: savedArtist });
//    } catch (error) {
//       console.error("Error saving artist:", error);
//       let errorMessage = "Failed to save the artist.";

//       // Handle specific error cases
//       if (error.name === 'ValidationError') {
//          errorMessage = "Validation error. Please check your input data.";
//       } else if (error.code === 11000) {
//          errorMessage = "Duplicate key error. Artist already exists.";
//       }

//       return res.status(400).json({ success: false, error: errorMessage });
//    }
// });

// module.exports = router;
