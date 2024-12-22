import express from 'express';
// import  logPerformance  from '../server_health';
import   logPerformance from "../server_health.js"; 

const app = express();
app.use(express.json());
app.post('/', (req, res) => {
    console.log(req.body," request to server 2")
    logPerformance("Server1");
    res.send('Result from server 2');
});
app.get('/',(req,res)=>{
    console.log("resquest to server1");
    logPerformance("Server1");
    res.send('get request from server1');
  });
app.listen(5001, (req, res) => {
    console.log('server 2 running on port 5001')
});

// logPerformance("server2");