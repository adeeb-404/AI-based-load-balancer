import express from 'express';


const app = express();
app.use(express.json());
app.post('/', (req, res) => {
    console.log(req.body," request to server 2")
  
    res.send('Result from server 2');
});
app.listen(5001, (req, res) => {
    console.log('server 2 running on port 5001')
});