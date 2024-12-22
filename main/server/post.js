import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs"; 
import path from "path"; 
import { fileURLToPath } from "url"; 
import dotenv from "dotenv";


const COUNT = 12;

dotenv.config(); // Load environment variables from .env file

// Equivalent of __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment Variables
const bucketName = process.env.BUCKET_NAME;
const accessKey = process.env.ACCESSKEY; // Corrected variable name
const secretKey = process.env.SECRET_KEY; // Corrected variable name

console.log(bucketName, accessKey, secretKey)

// S3 Client Configuration
const s3 = new S3Client({
  region: "us-east-1", // Replace with your region
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

async function pushToS3(name) {
  try {
    const params = {
      Bucket: bucketName,
      Key: name, // File name in S3
      Body: fs.readFileSync(path.join(__dirname, "nayi.jpeg")), // Read local file
      ContentType: "image/jpeg", // Set appropriate content type
    };
    
    const command = new PutObjectCommand(params);
    await s3.send(command);
    console.log("File successfully uploaded to S3!");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}



async function upload(){
    for(let i=4;i<COUNT;i++){
        await pushToS3(`image/${i}.jpeg`); 
    }
}

upload();