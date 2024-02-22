const express = require('express');
const axios = require('axios');
const Ably = require('ably');
require('dotenv').config();
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/translateTextWithDeepL',(req,res)=>{
    //console.log(req.body);
    let data = req.body;
    //console.log(process.env.deeplKey);
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api-free.deepl.com/v2/translate',
        headers: { 
          'Authorization': process.env.deeplKey, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  res.json(response.data)
})
.catch((error) => {
  console.log(error);
  res.send("Error");
});
   // res.send("test");
});
app.get('/getAblyAccesstoken',(req,res)=>{
  let {clientId}=req.query

  const ably= new Ably.Realtime(process.env.ablyKey)
 ably.auth.requestToken({clientId:clientId},(err,tokenDetails)=>{
 ably.close();
  res.json(tokenDetails)
 })




})
app.listen(3001, () => {
  console.log('Server running on port 3000');
});

module.exports = app;