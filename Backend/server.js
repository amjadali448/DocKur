const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');


const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use(bodyParser.json());
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});
let ipAddressGlobal = '';
app.post('/connect-ubuntu', async (req, res) => {
  const ipAddress = req.body.ipAddress;
  ipAddressGlobal = '127.0.0.1';
  console.log(ipAddress); 

    try
    {
        const dockerApiUrl = `http://${ipAddressGlobal}:2375/images/json`;
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

app.post('/Create-container', async (req, res) => {
  const containerData = {
    "Image": "nginx:latest",
    "Name": "my-container",
    "Cmd": ["nginx", "-g", "daemon off;"],
    "Env": ["VAR1=value1", "VAR2=value2"],
    "HostConfig": {
      "PortBindings": {
        "80/tcp": [
          {
            "HostPort": "8080"
          }
        ]
      }
    },
    "NetworkingConfig": {
      "EndpointsConfig": {
        "bridge": {
          "IPAMConfig": {
            "IPv4Address": "172.18.0.2"
          }
        }
      }
    }
  };

  try {
    const createContainerApi = 'http://127.0.0.1:2375/containers/create';
    const dockerApiResponse = await axios.post(createContainerApi, containerData, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Error:', error);
    res.status(500).send('Error creating docker Container');
  }
});


app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
