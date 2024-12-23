import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());


app.listen(4000,()=>{
    console.log('Server started on port 4000');
});

app.post("/log",(req, res)=>{
     try {
        console.log("Log Data Received:", JSON.stringify(req.body, null, 2));
    
        const logFilePath = path.join(__dirname, "load_balancer_logs.txt");
        fs.appendFileSync(logFilePath, JSON.stringify(req.body) + "\n");
    
        res.status(200).send("Log received");
      } catch (err) {
        console.error("Error writing log data:", err.message);
        res.status(500).send({ error: "Failed to save log data" });
      }
});