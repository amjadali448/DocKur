const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');
const fs = require('fs');


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
    const dockerApiUrl = `http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/json`;
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
    const dockerApiUrl = `http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/logs?stderr=true`;
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

app.post ('/container-stats',async(req,res)=>{
  try{
    const StatsApiUrl = `http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/stats`;
        const dockerApiresponse = await axios.get(StatsApiUrl,{httpsAgent});
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
    const startContainerApi = 'http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/start';

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
    const stopContainerApi = 'http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/stop';
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
    const restartContainerApi = 'http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/restart';
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
    const removeContainerApi = 'http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6?force=true';
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

app.post('/pause-container', async (req, res) => {
  try {
    const pauseContainerApi = 'http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/pause';
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

app.post('/unpause-container', async (req, res) => {
  try {
    const unpauseContainerApi = 'http://127.0.0.1:2375/containers/0199ded799e06b014752943ee931d33dd56b474d1c3a1bdfc3b88dbbbc8ad5b6/unpause';
    const dockerApiResponse = await axios.post(unpauseContainerApi,{ httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      res.status(200).send('Container is not Paused.');
    }
    else{
      console.error('Container Error:', error);
      res.status(500).send('Error Unpausing Docker Container');
    }
  }
});

app.post('/initiate-docker-build', async (req, res) => {
  console.log('amjad');
  try {
    const buildImageApi = 'http://127.0.0.1:2375/build?t=amjad';
    const tarballFilePath = '/home/amjad/DockerFiles/busybox.tar.gz';
    

    // Read the tarball content
    const tarballData = fs.readFileSync(tarballFilePath);
    console.log(tarballData);
    console.log('amjad1');
    // Make a POST request to the Docker Engine API to initiate the build
    const response = await axios.post(buildImageApi, tarballData, {
      headers: {
        'Content-Type': 'application/tar',
      },
    });

    // Check the response status and handle accordingly
    if (response.status === 200) {
      console.log('Build initiated successfully');
      res.json({ message: 'Build initiated successfully' });
    } else {
      console.error('Failed to initiate build:', response.status, response.data);
      res.status(response.status).json({ error: 'Failed to initiate build' });
    }
  } catch (error) {
    console.error('An error occurred while initiating the build:', error.message);
    res.status(500).send('Error Initiating Docker Build');
  }
});

app.post('/delete-image', async (req, res) => {
  try {
    const deleteImageApi = 'http://127.0.0.1:2375/images/a416a98b71e2?force=true';

    // Pass httpsAgent as a separate option in the Axios request configuration
    const dockerApiResponse = await axios.delete(deleteImageApi, {
      httpsAgent: httpsAgent, // Replace httpsAgent with your actual agent object
    });

    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Image Error:', error);
    res.status(500).send('Error Removing Docker Image');
  }
});

app.get ('/search-image',async(req,res)=>{
  try{
    const searchImagesApiUrl = `http://127.0.0.1:2375/images/search?term=ubuntu&limit=5`;
        const dockerApiresponse = await axios.get(searchImagesApiUrl,{httpsAgent});
        console.log(dockerApiresponse.data);
        res.json(dockerApiresponse.data);
    } 
    catch (error) 
    {
        console.error('connection error:', error);
        res.status(500).send('Error getting Docker images');
    }
});

app.post('/import-image', async (req, res) => {
  try {
    const importImagesApiUrl = `http://127.0.0.1:2375/images/create?fromImage=redis&tag=latest`;
    const headers = {
      'Content-Type': 'application/json',
      };
    const dockerApiResponse = await axios.post(importImagesApiUrl, {httpsAgent}, {headers: headers});
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error importing Docker image');
  }
});

app.post('/tag-image', async (req, res) => {
  try {
    const dockerHubUsername = 'amjad123ali';
    const dockerHubPassword = 'i170157@nu';
    const imageName = 'busybox';
    const targetRepo = 'amjad123ali/dockur_fyp';
    const targetTag = 'busybox';

    const tagImagesApiUrl = `http://127.0.0.1:2375/images/${imageName}/tag?repo=${targetRepo}&tag=${targetTag}`;
    const authConfig = {
      username: dockerHubUsername,
      password: dockerHubPassword,
    };
    const base64Auth = Buffer.from(JSON.stringify(authConfig)).toString('base64');

    const headers = {
      'Content-Type': 'application/json',
      'X-Registry-Auth': base64Auth,
    };

    const dockerApiResponse = await axios.post(tagImagesApiUrl, null, {
      headers: headers,
    });

    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error tagging the Docker image');
  }
});

app.post('/export-image', async (req, res) => {
  const user = 'amjad123ali';
  const pass = 'dckr_pat_Y-PM-Guumhgf3pIFiFYqqroXoD0'
  try {
    const authConfig = {
      username: user,
      password: pass,
    };
    const authString = Buffer.from(JSON.stringify(authConfig)).toString('base64');
    const headers = {
      'Content-Type': 'application/json',
      'X-Registry-Auth': authString,
    };
    const pushImageApiUrl = `http://127.0.0.1:2375/images/amjad123ali/dockur_fyp:busybox/push`;
    const dockerApiResponse = await axios.post(pushImageApiUrl, null, { headers });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error Pushing the Docker image');
  }
});

app.post('/pull-image', async (req, res) => {
  try {
    const pullImagesApiUrl = `http://127.0.0.1:2375/images/create?fromImage=amjad123ali/dockur_fyp&tag=busybox`;
    const headers = {
      'Content-Type': 'application/json',
      };
    const dockerApiResponse = await axios.post(pullImagesApiUrl, {httpsAgent}, {headers: headers});
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Pulling Docker image');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
