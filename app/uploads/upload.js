const router = require("express").Router();
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const multer = require("multer");

const upload = multer({ dest: "images/" });

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

/**
 * Upload an image
 */
router.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  let data = await uploadtos3(file);
  console.log(data);

  res.status(201).send(`File uploaded`);
});

/*
Upload a file to s3
*/
async function uploadtos3(file) {
  try {
    // CWE-23 Fix: Validate file path to prevent path traversal attacks
    const baseDir = path.resolve("images/");
    const resolvedPath = path.resolve(file.path);
    
    // Ensure the file path is within the expected directory
    if (!resolvedPath.startsWith(baseDir + path.sep) && resolvedPath !== baseDir) {
      throw new Error("Invalid file path - potential path traversal detected");
    }

    const uploadParams = {
      Bucket: "personal-notes-manager-uploadbucket",
      Key: file.filename,
      Body: fs.createReadStream(resolvedPath),
    };

    return s3.upload(uploadParams).promise();
  } catch (err) {
    throw new Error(`S3 upload error: ${err.message}`);
  }
}

module.exports = router;
