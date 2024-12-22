import express from 'express';


const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body," request to server 1")
  res.send('Result from server 1');
});


app.listen(5000, (req, res) => {
    console.log('server 1 running on port 5000')
});