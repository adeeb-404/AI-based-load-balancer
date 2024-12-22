import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/user1', (req, res) => {
  res.send('Hello, World! from user1');
});
app.get('/user2', (req, res) => {
  res.send('Hello, World! from user2');
});
const port=3030;
app.listen(port, (err, res) => {
    console.log('server listening on port '+port);    
});