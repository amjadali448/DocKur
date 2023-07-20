//library imports
const express = require('express');
const bodyParser = require('body-parser');
const { NodeSSH } = require('node-ssh');
const axios = require('axios');
const https = require('https');
const fs = require('fs');


// Read private key file
const privateKey = fs.readFileSync('C:/Users/Miche/OneDrive/Desktop/key1.pem', 'utf8');


const app = express();
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

app.post('/execute-ssh', async(req, res) =>  {
  const ipAddress = req.body['ipAddress']
  const ssh = new NodeSSH();
  const sshConfig = {
    host: ipAddress,
    port: 22,
    username: 'ubuntu',
    privateKey: privateKey
};
  try {
    await ssh.connect(sshConfig);
    console.log("SSH connection successful");

    const dockerApiUrl = `http://${ipAddress}:2375/images/json`;
    const dockerApiresponse = await axios.get(dockerApiUrl,{httpsAgent});
    console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  } catch (error) {
    console.error('SSH connection error:', error);
    res.status(500).send('Error connecting to the EC2 instance');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
