import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Environment Variables
const bucketName = process.env.BUCKET_NAME;
const accessKey = process.env.ACCESSKEY;
const secretKey = process.env.SECRET_KEY;



// S3 Client Configuration
const s3 = new S3Client({
  region: "us-east-1", // Replace with your region
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

async function listFilesUnderImageFolder() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: "image/", // Specify the folder prefix
    });

    const response = await s3.send(command);
    if (response.Contents) {
      console.log("Files in the 'image' folder:");
      response.Contents.forEach((file) => {
        console.log(`- ${file.Key}`);
      });
    } else {
      console.log("The 'image' folder is empty.");
    }
  } catch (error) {
    console.error("Error listing files:", error);
  }
}

listFilesUnderImageFolder();
