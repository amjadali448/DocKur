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

app.post ('/inspect-container',async(req,res)=>{
  try{
    const dockerApiUrl = `http://127.0.0.1:2375/containers/nervous_spence/json`;
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

app.post ('/container-logs',async(req,res)=>{
  try{
    const dockerApiUrl = `http://127.0.0.1:2375/containers/nervous_spence/logs?stderr=true`;
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

app.post ('/container-list',async(req,res)=>{
  try{
    const dockerApiUrl = `http://127.0.0.1:2375/containers/json?all=true`;
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
    "Name": "my-container1",
    "Cmd": ["nginx", "-g", "daemon off;"],
    "HostConfig": {
      "PortBindings": {
        "80/tcp": [
          {
            "HostPort": "8080"
          }
        ]
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

app.post('/start-container', async (req, res) => {
  try {
    const startContainerApi = 'http://127.0.0.1:2375/containers/64acc773fcb3ea8c0302b0a9486917d51733d3cc397e67143ce1ec37cd47ee79/start';

    const dockerApiResponse = await axios.post(startContainerApi, {}, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Error:', error);
    res.status(500).send('Error Starting Docker Container');
  }
});

app.post('/stop-container', async (req, res) => {
  try {
    const stopContainerApi = 'http://127.0.0.1:2375/containers/64acc773fcb3ea8c0302b0a9486917d51733d3cc397e67143ce1ec37cd47ee79/stop';
    const dockerApiResponse = await axios.post(stopContainerApi,{ httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 304) {
      res.status(200).send('Container was already stopped.');
    }
    else{
      console.error('Container Error:', error);
      res.status(500).send('Error Stopping Docker Container');
    }
  }
});

app.post('/restart-container', async (req, res) => {
  try {
    const restartContainerApi = 'http://127.0.0.1:2375/containers/64acc773fcb3ea8c0302b0a9486917d51733d3cc397e67143ce1ec37cd47ee79/restart';
    const dockerApiResponse = await axios.post(restartContainerApi,{ httpsAgent });
    console.log(dockerApiResponse.data);
    console.log("Amjad");
    res.json(dockerApiResponse.data);
  } catch (error) {
      console.error('Container Error:', error);
      res.status(500).send('Error Restarting Docker Container');
  }
});


app.post('/removing-container', async (req, res) => {
  try {
    const removeContainerApi = 'http://127.0.0.1:2375/containers/64acc773fcb3ea8c0302b0a9486917d51733d3cc397e67143ce1ec37cd47ee79?force=true';
    const dockerApiResponse = await axios.delete(removeContainerApi,{ httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
      console.error('Container Error:', error);
      res.status(500).send('Error Removing Docker Container');
  }
});

app.post('/delete-stopped-containers', async (req, res) => {
  try {
    const deleteContainerApi = 'http://127.0.0.1:2375/containers/prune';
    const dockerApiResponse = await axios.post(deleteContainerApi,{ httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
      console.error('Container Error:', error);
      res.status(500).send('Error deleting Docker Containers');
  }
});

app.post('/pause-containers', async (req, res) => {
  try {
    const pauseContainerApi = 'http://127.0.0.1:2375/containers/flamboyant_goldberg/pause';
    const dockerApiResponse = await axios.post(pauseContainerApi,{ httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      res.status(200).send('Container is not running.');
    }
    else{
      console.error('Container Error:', error);
      res.status(500).send('Error Stopping Docker Container');
    }
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
