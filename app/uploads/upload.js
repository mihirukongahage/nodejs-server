const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");

const upload = multer({ dest: "images/" });

/**
 * Upload an image
 */
router.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  // S3 upload functionality has been disabled due to security vulnerability
  // File is saved locally in the "images/" directory

  res.status(201).send(`File uploaded to local directory`);
});

module.exports = router;
