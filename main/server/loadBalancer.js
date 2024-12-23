import express from "express";
import fs from "fs";
import fetch from "node-fetch"; // Ensure this is installed
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Define backend servers
// const servers = [
//   "https://ai-based-load-balancer-302o.onrender.com",
//   "https://ai-based-load-balancer-1.onrender.com",
// ];
const servers = [
  "http://localhost:5000",
  "http://localhost:5001",
];
let currentServer = 0;

// Function to get the next server
const getNextServer = () => {
  const server = servers[currentServer];
  currentServer = (currentServer + 1) % servers.length;
  return server;
};

// Route: Load Balancer
app.use(async (req, res) => {
  const server = getNextServer();

  try {
    console.log(`Forwarding ${req.method} request to: ${server}`);
    const fetchOptions = {
      method: req.method,
      headers: { "Content-Type": "application/json" },
    };

    if (req.method !== "GET") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(server, fetchOptions);
    const responseData = await response.json();

    const body = responseData.body;
    const logData = responseData.logs; 
    // console.log(logs)
    // fs.appendFileSync(
    //   path.join(__dirname, "serverlogs.txt"),
    //   JSON.stringify(logs)+'\n'
    // );

    console.log(`Response from ${server}:`, responseData);

      // Convert the log data to CSV format
  const logRow = `${logData.timestamp},${logData.servername},${logData.userCPUTime},${logData.systemCPUTime},${logData.currentCPUUsagePercent},${logData.rssMemory},${logData.heapTotalMemory},${logData.heapUsedMemory},${logData.freeMemory},${logData.totalMemory},${logData.uptime}\n`;

  // Path to the CSV file
  const csvFilePath = path.join(process.cwd(), "server_logs.csv");

  // Append to CSV file, or create it if it doesn't exist
  if (!fs.existsSync(csvFilePath)) {
    const header = "Timestamp,Server Name,User CPU Time,System CPU Time,CPU Usage (%),RSS Memory,Heap Total Memory,Heap Used Memory,Free Memory,Total Memory,Uptime (s)\n";
    fs.writeFileSync(csvFilePath, header); // Write header if file doesn't exist
  }

  fs.appendFileSync(csvFilePath, logRow);
  console.log("Log written to CSV:", logRow.trim());


    res.status(response.status).send(body);
  } catch (err) {
    console.error(`Error forwarding request to ${server}:`, err.message);
    res.status(500).send({ error: "Failed to forward the request" });
  }
});


// Route: Log Data


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Load Balancer running on port ${PORT}`);
});
