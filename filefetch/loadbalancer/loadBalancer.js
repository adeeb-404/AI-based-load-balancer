import express from "express";

const app = express();
app.use(express.json());
const servers = ["https://ai-based-load-balancer-302o.onrender.com", "https://ai-based-load-balancer-1.onrender.com"];
let currentServer = 0;
// Load Balancing Logic
app.use((req, res) => {

  const server = servers[currentServer];
  currentServer = (currentServer + 1) % servers.length;
    console.log(req.body);
  (async ()=>{  
    try {
        console.log(req.method, req.headers, req.body);
        const response = await fetch(server, {
          method: req.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        });
    
        const data = await response.text();
        res.status(response.status).send(data);
      } catch (err) {
        res.status(500).send(err.message);
      }
  })();
});

app.listen(3000, () => console.log("Load Balancer running on port 3000"));