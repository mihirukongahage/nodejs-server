const router = require("express").Router();
const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();
const multer = require("multer");
const rateLimit = require("express-rate-limit");

const upload = multer({ dest: "images/" });

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Rate limiter for upload endpoint to prevent abuse
const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 upload requests per windowMs
  message: "Too many upload requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Upload an image
 */
router.post("/upload", uploadRateLimiter, upload.single("image"), async (req, res) => {
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

    return s3.upload(uploadParams).promise();
  } catch (err) {
    throw new Error(`S3 upload error: ${err.message}`);
  }
}

module.exports = router;
