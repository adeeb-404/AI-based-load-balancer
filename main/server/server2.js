import express from "express";
import {logPerformance} from "./server_health.js"; // Adjust the path based on your project structure

const app = express();
app.use(express.json());

// POST handler
app.post("/", (req, res) => {
  console.log(req.body, "request to server 2");
  res.json({logs:logPerformance("Server 2"),body:"POST from server 2"});
});

// GET handler
app.get("/", (req, res) => {
  console.log("Request to server 2");
  res.json({logs:logPerformance("Server 2"),body:"GET from server 2"});
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server 2 running on port ${PORT}`);

});
