const router = require("express").Router();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
require("dotenv").config();
const multer = require("multer");

const upload = multer({ dest: "images/" });

// Create S3 client with v3 API
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
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
    const uploadParams = {
      Bucket: "personal-notes-manager-uploadbucket",
      Key: file.filename,
      Body: fs.createReadStream(file.path),
    };

    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);

    return response;
  } catch (err) {
    throw new Error(`S3 upload error: ${err.message}`);
  }
}

module.exports = router;
