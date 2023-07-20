const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with the actual URL of your frontend server
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(bodyParser.json());
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

app.post('/connect-ubuntu', async (req, res) => {
  const ipAddress = req.body.ipAddress;
  console.log(ipAddress); 

    try
    {
        const dockerApiUrl = `http://${ipAddress}:2375/images/json`;
        const dockerApiresponse = await axios.get(dockerApiUrl,{httpsAgent});
        console.log(dockerApiresponse.data);
        res.json(dockerApiresponse.data);
    } 
    catch (error) 
    {
        console.error('connection error:', error);
        res.status(500).send('Error connecting to the Docker');
    }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
