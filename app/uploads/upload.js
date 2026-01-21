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
 * Validates and sanitizes file path to prevent path traversal attacks
 */
function validateFilePath(filePath, expectedDir) {
  const normalizedPath = path.normalize(filePath);
  const resolvedPath = path.resolve(normalizedPath);
  const resolvedExpectedDir = path.resolve(expectedDir);
  
  if (!resolvedPath.startsWith(resolvedExpectedDir)) {
    throw new Error("Invalid file path: Path traversal detected");
  }
  
  if (normalizedPath.includes("..")) {
    throw new Error("Invalid file path: Path traversal sequence detected");
  }
  
  return resolvedPath;
}

/**
 * Upload an image
 */
router.post("/upload", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(file);

  try {
    let data = await uploadtos3(file);
    console.log(data);
    res.status(201).send(`File uploaded`);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(400).send(`Upload failed: ${err.message}`);
  }
});

/*
Upload a file to s3
*/
async function uploadtos3(file) {
  try {
    const expectedDir = path.resolve("images");
    const validatedPath = validateFilePath(file.path, expectedDir);
    
    const sanitizedFilename = path.basename(file.filename).replace(/[^a-zA-Z0-9._-]/g, '_');
    
    const uploadParams = {
      Bucket: "personal-notes-manager-uploadbucket",
      Key: sanitizedFilename,
      Body: fs.createReadStream(validatedPath),
    };

    return s3.upload(uploadParams).promise();
  } catch (err) {
    throw new Error(`S3 upload error: ${err.message}`);
  }
}

module.exports = router;
