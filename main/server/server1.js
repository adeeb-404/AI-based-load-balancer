import express from "express";
import {logPerformance} from "./server_health.js"; // Adjust the path based on your project structure

const app = express();
app.use(express.json());

// POST handler
app.post("/", (req, res) => {
  console.log(req.body, "request to server 1");
  res.json({logs:logPerformance("Server1"),body:"POST from server 1"});
});

// GET handler
app.get("/", (req, res) => {
  console.log("Request to server 1");
  res.json({logs:logPerformance("Server1"),body:"GET from server 1"});
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server 1 running on port ${PORT}`);

});

// Schedule health logs
// setInterval(() => logPerformance(`Server running on port ${PORT}`), 5000);
