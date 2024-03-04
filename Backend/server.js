const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const axios = require('axios');
const fs = require('fs');
const { NodeSSH } = require('node-ssh');
const { log } = require('console');
const { default: container } = require('node-docker-api/lib/container');

// test work
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set the specific origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  next();
});

app.use(bodyParser.json());
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});
 const privateKey = fs.readFileSync('/home/amjad/Downloads/Key1.pem', 'utf8');
//const privateKey = fs.readFileSync('D:\\Key1.pem', 'utf8');
let ipAddress = "127.0.0.1";

//============================================================/////============================================================

//this api is used for connecting to ec2 machine and getting the docker images for that machine in json form.
app.post('/execute-ssh', async (req, res) => {
  //const ipAddress = req.body.connectIp;
  //console.log("IP Address---------------:", ipAddress);

  try {
    // const ssh = new NodeSSH();
    // const sshConfig = {
    //   host: ipAddress,
    //   port: 22,
    //   username: 'ubuntu',
    //   privateKey: privateKey // Ensure privateKey is properly defined
    // };

    // await ssh.connect(sshConfig);
    console.log("SSH connection successful");

    const dockerApiUrl = `http://${ipAddress}:2375/images/json`;
    const dockerApiResponse = await axios.get(dockerApiUrl);
    console.log("AMJAD ALI KHAN");
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 'ENOTFOUND') {
      res.status(404).send('Host not found');
    } else if (error.code === 'ECONNREFUSED') {
      res.status(503).send('Connection refused');
    } else {
      res.status(500).send('Error connecting to the EC2 instance');
    }
  }
});

app.post('/Used-images', async (req,res)=>{
try {
    // Get a list of all images
    const dockerImagesApiUrl = `http://${ipAddress}:2375/images/json`;
    const dockerImagesResponse = await axios.get(dockerImagesApiUrl);
    const allImages = dockerImagesResponse.data;

    // Get a list of all containers
    const dockerContainersApiUrl = `http://${ipAddress}:2375/containers/json`;
    const dockerContainersResponse = await axios.get(dockerContainersApiUrl);
    const allContainers = dockerContainersResponse.data;

    // Extract the image IDs from running containers
    const usedImageIds = new Set(allContainers.map(container => container.ImageID));

    // Filter images to include only those used by containers
    const usedImages = allImages.filter(image => usedImageIds.has(image.Id));

    res.json(usedImages);
  } 
  catch (error) {
    console.error('Error:', error);
    if (error.code === 'ENOTFOUND') {
      res.status(404).send('Host not found');
    } else if (error.code === 'ECONNREFUSED') {
      res.status(503).send('Connection refused');
    } else {
      res.status(500).send('Error connecting to the Docker daemon');
    }
  }
});


app.post('/Unused-images', async (req, res) => {
  try {
    // Get a list of all images
    const dockerImagesApiUrl = `http://${ipAddress}:2375/images/json`;
    const dockerImagesResponse = await axios.get(dockerImagesApiUrl);
    const allImages = dockerImagesResponse.data;

    // Get a list of all containers
    const dockerContainersApiUrl = `http://${ipAddress}:2375/containers/json`;
    const dockerContainersResponse = await axios.get(dockerContainersApiUrl);
    const allContainers = dockerContainersResponse.data;

    // Extract the image IDs from running containers
    const usedImageIds = new Set(allContainers.map(container => container.ImageID));

    // Filter images to include only those used by containers
    const usedImages = allImages.filter(image => usedImageIds.has(image.Id));

    // Filter images to include only those not used by containers
    const unusedImages = allImages.filter(image => !usedImageIds.has(image.Id));

    res.json(unusedImages);
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 'ENOTFOUND') {
      res.status(404).send('Host not found');
    } else if (error.code === 'ECONNREFUSED') {
      res.status(503).send('Connection refused');
    } else {
      res.status(500).send('Error connecting to the Docker daemon');
    }
  }
});


// --------------------


//this api is used for inspecting the container using container id.
app.post('/inspect-container', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const dockerApiUrl = `http://${ipAddress}:2375/containers/${containerId}/json`;
    const dockerApiresponse = await axios.get(dockerApiUrl, { httpsAgent });
    console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});


//this api is used for checking the logs of container using container id
app.post('/container-logs', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const dockerApiUrl = `http://${ipAddress}:2375/containers/${containerId}/logs?stderr=true`;
    const dockerApiresponse = await axios.get(dockerApiUrl, { httpsAgent });
    //   console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});


//this api is used for checking the resource used by container in the form of stats
app.post('/container-stats', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.log('----containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const StatsApiUrl = `http://${ipAddress}:2375/containers/${containerId}/stats?stream=false&one-shot=true`;
    const dockerApiresponse = await axios.get(StatsApiUrl, { httpsAgent });
    //console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});


//this api is used for getting the list of containers available on ec2 machine and return the containers records in json form
app.post('/container-list', async (req, res) => {
  try {
    const dockerApiUrl = `http://${ipAddress}:2375/containers/json?all=true`;
    const dockerApiresponse = await axios.get(dockerApiUrl, { httpsAgent });
    //   console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});

app.post('/running-container', async (req, res) => {
  try {
    const filters = encodeURIComponent(JSON.stringify({ status: ['running'] }));
    const dockerApiUrl = `http://${ipAddress}:2375/containers/json?all=true&filters=${filters}`;
    
    const dockerApiResponse = await axios.get(dockerApiUrl, { httpsAgent });
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});

app.post('/stopped-container-list', async (req, res) => {
  try {
    // Using Docker API filters to get only stopped containers
    const filters = encodeURIComponent(JSON.stringify({ status: ['exited'] }));
    const dockerApiUrl = `http://${ipAddress}:2375/containers/json?all=true&filters=${filters}`;
    
    const dockerApiResponse = await axios.get(dockerApiUrl, { httpsAgent });
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});

//this api is used to create a new container. reqiure some data like environment variables, port mapping. assigning network etc**
app.post('/create-container', async (req, res) => {
  const {
    imgName,
    ContainerName,
    Ports,
    Volume,
    Env
  } = req.body;
  const portBindings = {};
  if (Ports.host && Ports.container) {
    // Assume Ports object has both host and container properties
    portBindings[`${Ports.host}/tcp`] = [{ "HostPort": Ports.container }];
  }
  const containerData = {
    Image: `${imgName}`,
    Hostname: `${ContainerName}`,
    Env: Env.map(({ name, value }) => `${name}=${value}`),
    "HostConfig": {
      "PortBindings": portBindings
    }
    // Add other properties as needed
  };

  try {
    const createContainerApi = `http://${ipAddress}:2375/containers/create?name=${ContainerName}`;
    const dockerApiResponse = await axios.post(createContainerApi, containerData, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Error:', error);
    res.status(500).send('Error creating docker Container');
  }
});
// app.post('/Create-container', async (req, res) => {
//   const { imgName, Env, Volume ,Ports} = req.body;
//   console.log("create-----", req.body, "-----container");
//   // this is how the data from frontend arrives. Console of req.body below
//   // {
//   //   imgId: 'sha256:4adfd1570a082e12ce920b9c4901f812bffb43ec48adf79ac1b1d5b68466c0e2',
//   //   imgName: 'hylang',
//   //   ContainerName: "winter's Workspace",
//   //   Ports: { host: '80', container: 'tcp/567' },
//   //   Volume: 'Machine-Volume',
//   //   Env: [
//   //     { name: 'var1', value: 'val1' },
//   //     { name: 'var12', value: 'val12' },
//   //     { name: 'var123', value: 'val123' },
//   //     { name: 'var1234', value: 'val1234' }
//   //   ]
//   // } 

//   const containerData = {

//     Image :  imgName,
//     Env : env,
    
//     // Env: [
//     //   "MYSQL_HOST=mysql",
//     //   "MYSQL_USER=root",
//     //   "MYSQL_PASSWORD=secret",
//     //   "MYSQL_DB=todos"
//     // ],
//     "HostConfig": {
//       "PortBindings": {
//         "3000/tcp": [
//           {
//             "HostPort": "3005"
//           }
//         ]
//       }
//     }
//   };

//   try {
//     const createContainerApi = `http://${ipAddress}:2375/containers/create?name=Pakistan`;
//     const dockerApiResponse = await axios.post(createContainerApi, containerData, { httpsAgent });
//     //   console.log(dockerApiResponse.data);
//     res.json(dockerApiResponse.data);
//   } catch (error) {
//     console.error('Container Error:', error);
//     res.status(500).send('Error creating docker Container');
//   }
// });

//this api is used for starting a container require container id
app.post('/start-container', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const startContainerApi = `http://${ipAddress}:2375/containers/${containerId}/start`;

    const dockerApiResponse = await axios.post(startContainerApi, {}, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Error:', error);
    res.status(500).send('Error Starting Docker Container');
  }
});

//this api is used for stopping the container requiring container id
app.post('/stop-container', async (req, res) => {
  try {
    const containerId = req.body.containerId; // Change from req.query to req.body
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const stopContainerApi = `http://${ipAddress}:2375/containers/${containerId}/stop`;
    const dockerApiResponse = await axios.post(stopContainerApi, null, { httpsAgent });

    res.json(dockerApiResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 304) {
      res.status(200).send('Container was already stopped.');
    } else {
      console.error('Container Error:', error);
      res.status(500).send('Error Stopping Docker Container');
    }
  }
});





//this api is used for restarting a container requiring container id 
app.post('/restart-container', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }
    console.log(containerId, "restart---------");
    const restartContainerApi = `http://${ipAddress}:2375/containers/${containerId}/restart`;
    const dockerApiResponse = await axios.post(restartContainerApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    //   console.log("Amjad");
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('restart Error:', error);
    res.status(500).send('Error Restarting Docker Container');
  }
});





//this api is used for removing a specific container using its id
app.post('/removing-container', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const removeContainerApi = `http://${ipAddress}:2375/containers/${containerId}?force=true`;
    const dockerApiResponse = await axios.delete(removeContainerApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Removing Error:', error);
    res.status(500).send('Error Removing Docker Container');
  }
});

//this api is used for deleteing all the stopped containers
app.post('/delete-stopped-containers', async (req, res) => {
  try {
    const deleteContainerApi = `http://${ipAddress}:2375/containers/prune`;
    const dockerApiResponse = await axios.post(deleteContainerApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Error:', error);
    res.status(500).send('Error deleting Docker Containers');
  }
});





//this api is used for pausing the container
app.post('/pause-container', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const pauseContainerApi = `http://${ipAddress}:2375/containers/${containerId}/pause`;
    const dockerApiResponse = await axios.post(pauseContainerApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      res.status(200).send('Container is not running.');
    }
    else {
      console.error('Container Error:', error);
      res.status(500).send('Error Stopping Docker Container');
    }
  }
});






//this api is used for unpausing the container
app.post('/unpause-container', async (req, res) => {
  try {
    const containerId = req.body.containerId;
    console.error('------containerId-----:', containerId);

    if (!containerId) {
      return res.status(400).json({ error: 'Container ID is required' });
    }

    const unpauseContainerApi = `http://${ipAddress}:2375/containers/${containerId}/unpause`;
    const dockerApiResponse = await axios.post(unpauseContainerApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      res.status(200).send('Container is not Paused.');
    }
    else {
      console.error('Container Error:', error);
      res.status(500).send('Error Unpausing Docker Container');
    }
  }
});




//this api is used for updating the port of the container
app.post('/update-port', async (req, res) => {

  // const containerId = req.body.containerId;
  const containerId = '87ada2bb7535ecf0e385a26aaf94f3ce9c5852beba22c814bf2a0f8275dadd73';
  console.error('------containerId-----:', containerId);

  if (!containerId) {
    return res.status(400).json({ error: 'Container ID is required' });
  }

  const requestData = {
    PortBindings: {
      '3000/tcp': [
        {
          HostPort: '3005'
        }
      ]
    },
  };
  try {
    const dockerApiEndpoint = `http://${ipAddress}:2375/containers/${containerId}/update`;
    const dockerApiResponse = await axios.post(dockerApiEndpoint, requestData);
    console.log('Port bindings updated:', dockerApiResponse.data);
    res.json({ message: 'Port bindings updated' });

  } catch (error) {
    console.error('Docker API Error:', error);
    res.status(500).send('Error updating port bindings');
  }
});


//this api is used for creating an image using tarbar file "busybox.tar.gz"
app.post('/initiate-docker-build', async (req, res) => {

  try {
    const tarballFilePath = req.body.imagePath;
    console.log("Image path----", tarballFilePath);
    const tag = req.body.ImageTag;
    console.log("Image Tag----", tag);
    if (!tag) {
      return res.status(400).json({ error: 'Name for image is required' });
    }
    if (!tarballFilePath) {
      return res.status(400).json({ error: 'Tarball1 file path is required' });
    }
    const buildImageApi = `http://127.0.0.1:2375/build?t=${tag}`;
    //const tarballFilePath = '/home/amjad/DockerFiles/busybox.tar.gz';

    // Read the tarball content
    const tarballData = fs.readFileSync(tarballFilePath);
    console.log(tarballData);
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




//this api is used for deleting an image*
app.post('/delete-image', async (req, res) => {

  const containerId = req.body.imageId;
  // const containerId = 'a416a98b71e2';
  console.error('------delete-image----:', containerId);

  if (!containerId) {
    return res.status(400).json({ error: 'Container ID is required' });
  }

  try {
    const deleteImageApi = `http://${ipAddress}:2375/images/${containerId}?force=true`;

    // Pass httpsAgent as a separate option in the Axios request configuration
    const dockerApiResponse = await axios.delete(deleteImageApi, {
      httpsAgent: httpsAgent, // Replace httpsAgent with your actual agent object
    });

    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Image Error:', error);
    res.status(500).send('Error Removing Docker Image');
  }
});




//this api is used for searching an image*
app.post('/search-image', async (req, res) => {
  const imageName = req.body.imageName;
  // const imageName = 'ubuntu';
  console.error('------Image Name-----:', req.body.imageName);

  if (!imageName) {
    return res.status(400).json({ error: 'Image Name is required' });
  }

  try {
    const searchImagesApiUrl = `http://${ipAddress}:2375/images/search?term=${imageName}&limit=5`;
    const dockerApiresponse = await axios.get(searchImagesApiUrl, { httpsAgent });
    //   console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error getting Docker images');
  }
});




//this api is used for importing an image from dockerhub
app.post('/import-image', async (req, res) => {
  try {
    // const imageName = 'redis';
    console.log('------importImgName---------------:', req.body.importImgName);
    const imageName = req.body.importImgName;

    if (!imageName) {
      return res.status(400).json({ error: 'Image Name is required' });
    }
    const importImagesApiUrl = `http://${ipAddress}:2375/images/create?fromImage=${imageName}&tag=latest`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const dockerApiResponse = await axios.post(importImagesApiUrl, { httpsAgent }, { headers: headers });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error importing Docker image');
  }
});


//this api is used for giving a tag to an image, which is first step for expoting the image to private registry on the docker hub
app.post('/tag-image', async (req, res) => {
  console.log("tag----------------------------------tag img", req.body.tagName)
  const tagName = req.body.tagName;


  try {
    const imageName = tagName;
  
      // if (!imageName) {
      //   return res.status(400).json({ error: 'Image Name is required' });
      // }
      const targetTag = imageName;
    const dockerHubUsername = 'amjad123ali';
    const dockerHubPassword = 'i170157@nu';
    //const imageName = 'busybox';
    const targetRepo = 'amjad123ali/dockur_fyp';
    //const targetTag = 'busybox';

    const tagImagesApiUrl = `http://${ipAddress}:2375/images/${imageName}/tag?repo=${targetRepo}&tag=${targetTag}`;
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




//this api is used for exporting an image second step. first image must be tagged then export
app.post('/export-image', async (req, res) => {



  const user = 'amjad123ali';
  const pass = 'dckr_pat_Y-PM-Guumhgf3pIFiFYqqroXoD0'

  const imageName = req.body.pushImageName
  console.log("----------------------------export-image", imageName);


  if (!imageName) {
    return res.status(400).json({ error: 'Image Name is required' });
  }

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
    const pushImageApiUrl = `http://${ipAddress}:2375/images/amjad123ali/dockur_fyp:${imageName}/push`;
    const dockerApiResponse = await axios.post(pushImageApiUrl, null, { headers });
     console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error Pushing the Docker image');
  }
});




//this api is used for pulling an image private registry 
app.post('/pull-image', async (req, res) => {
  try {
    // const imageName = 'busybox';
    const imageName = req.body.pullimageName;
    console.log('------Pull Name-----:', imageName);

    if (!imageName) {
      return res.status(400).json({ error: 'Image Name is required' });
    }

    const pullImagesApiUrl = `http://${ipAddress}:2375/images/create?fromImage=amjad123ali/dockur_fyp&tag=${imageName}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    const dockerApiResponse = await axios.post(pullImagesApiUrl, { httpsAgent }, { headers: headers });
    // console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error Pulling Docker image');
  }
});




// network
//this api is used for getting the docker newtorks 
app.post('/network-list', async (req, res) => {
  try {
    const dockerApiUrl = `http://${ipAddress}:2375/networks`;
    const dockerApiresponse = await axios.get(dockerApiUrl, { httpsAgent });
    //   console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});



//this api is used for inspecting docker network
app.post('/inspect-network', async (req, res) => {
  try {
    const networkId = req.body.networkId; // Retrieve the network name from the request body

    if (!networkId) {
      return res.status(400).json({ error: 'Network ID is required' });
    }

    const dockerApiUrl = `http://${ipAddress}:2375/networks/${networkId}`;
    const dockerApiResponse = await axios.get(dockerApiUrl, { httpsAgent });

    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error inspecting the docker network');
  }
});



//this api is used for removing docker network
app.post('/removing-network', async (req, res) => {
  console.log();
  try {
    const networkId = req.body.networkId; // Retrieve the network name from the request body

    if (!networkId) {
      return res.status(400).json({ error: 'Network Name is required' });
    }

    const removeNetworkApi = `http://${ipAddress}:2375/networks/${networkId}`;
    const dockerApiResponse = await axios.delete(removeNetworkApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Container Error:', error);
    res.status(500).send('Error Removing Docker network');
  }
});




//this api is used for creating docker network requires a name
app.post('/Create-network', async (req, res) => {
  console.log(req.body, "req.body");
  const Name = req.body.name;
  if (!Name) {
    return res.status(400).json({ error: 'Network name is required' });
  }
  const networkData = {

    Name,
    "CheckDuplicate": true,
    "Driver": "bridge",
  };
  try {
    const createNetworkApi = `http://${ipAddress}:2375/networks/create`;
    const dockerApiResponse = await axios.post(createNetworkApi, networkData, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json({ data: dockerApiResponse.data, message: 'Network Created Successfully' });
  } catch (error) {
    console.error('Network Error:', error);
    res.status(500).send('Error creating docker network');
  }
});




app.post('/Connect-container', async (req, res) => {
  const Container = req.body.containerId;
  const networkName = req.body.networkName;

  console.log(req.body, "-------------------------------------------------------------------");
  if (!Container) {
    return res.status(400).json({ error: 'Container ID is required' });
  }
  if (!networkName) {
    return res.status(400).json({ error: 'Network Name is required' });
  }
  const requestData = {
    Container
  };
  try {
    const connectConatinerApi = `http://${ipAddress}:2375/networks/${networkName}/connect`;
    const dockerApiResponse = await axios.post(connectConatinerApi, requestData, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json({ data: dockerApiResponse.data, message: 'Container connected Successfully' });
  } catch (error) {
    console.error('Network Error:', error);
    res.status(500).send('Error Connecting Container');
  }
});



app.post('/Disconnect-container', async (req, res) => {
  console.log("------------------", req.query, "---------------------------------------------");
  const Container = req.query.containerId;
  const networkName = req.query.networkName;
  console.log(networkName);
  if (!Container) {
    return res.status(400).json({ error: 'Container ID is required' });
  }
  if (!networkName) {
    return res.status(400).json({ error: 'Network Name is required' });
  }
  const requestData = {
    Container,
    force: true
  };
  try {
    const disconnectConatinerApi = `http://127.0.0.1:2375/networks/${networkName}/disconnect`;
    const dockerApiResponse = await axios.post(disconnectConatinerApi, requestData, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.status(200).send('Successfully disconnected docker container from a network');
  } catch (error) {
    console.error('Network Error:', error);
    res.status(500).send('Error Disconnecting docker container from a network');
  }
});



//this api is used for deleting unused docker network
app.post('/Delete-unused-Networks', async (req, res) => {
  console.log('unused net hit');
  try {
    const DeleteUnusedNetworksApi = `http://${ipAddress}:2375/networks/prune`;
    const dockerApiResponse = await axios.post(DeleteUnusedNetworksApi, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json({ data: dockerApiResponse.data, message: 'All un-used Networks deleted' });
  } catch (error) {
    console.error('Network Error:', error);
    res.status(500).send('Error removing unused networks');
  }
});



//Volumes
//this api is used for creating docker volume
app.post('/Create-volume', async (req, res) => {
  // console.log("----res----", req, res);
  const volumeData = {
    "Name": req.body.name,
    "Driver": "local",
  };

  try {
    const createVolumeApi = `http://${ipAddress}:2375/volumes/create`;
    const dockerApiResponse = await axios.post(createVolumeApi, volumeData, { httpsAgent });
    // console.log("----",dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Network Error:', error);
    res.status(500).send('Error creating docker volume');
  }
});



//this api is used for getting volumes created on docker 
app.post('/volume-list', async (req, res) => {
  try {
    const volumeListApiUrl = `http://${ipAddress}:2375/volumes`;
    const dockerApiresponse = await axios.get(volumeListApiUrl, { httpsAgent });
    //   console.log(dockerApiresponse.data);
    res.json(dockerApiresponse.data);
  }
  catch (error) {
    console.error('connection error:', error);
    res.status(500).send('Error connecting to the Docker');
  }
});



//this api is used for inspecting  docker volume
app.post('/inspect-volume', async (req, res) => {
  try {
    const volName = req.query.volName; // Retrieve the 'name' from the request body
    if (!volName) {
      return res.status(400).json({ error: 'Volume name is required' });
    }
    // console.log(volName, "volName");

    const dockerApiUrl = `http://${ipAddress}:2375/volumes/${volName}`;
    const dockerApiResponse = await axios.get(dockerApiUrl, { httpsAgent });

    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Connection error:', error);
    res.status(500).send('Error connecting to the Docker volume');
  }
});



//this api is used for removing docker volume using its name
app.post('/removing-volume', async (req, res) => {
  try {
    const volName = req.body.volName; // Retrieve the 'name' from the request body
    if (!volName) {
      return res.status(400).json({ error: 'Volume name is required' });
    }

    console.log(volName, "volName")
    const removeVolumeApi = `http://${ipAddress}:2375/volumes/${volName}?force=true`;
    const dockerApiResponse = await axios.delete(removeVolumeApi, { httpsAgent });
    //   console.log(dockerApiResponse.data);
    res.json(dockerApiResponse.data);
  } catch (error) {
    console.error('Volume Error:', error);
    res.status(500).send('Error Removing Docker volume');
  }
});


//this api is used to delete all unused volume
app.post('/Delete-unused-volume', async (req, res) => {
  console.log('unused vol hit');

  try {
    const DeleteUnusedVolumeApi = `http://${ipAddress}:2375/volumes/prune`;
    const dockerApiResponse = await axios.post(DeleteUnusedVolumeApi, { httpsAgent });
    console.log(dockerApiResponse.data);
    res.json({ data: dockerApiResponse.data, message: 'All un-used Volumes Deleted Successfully' });
  } catch (error) {
    console.error('volume Error:', error);
    res.status(500).send('Error deleting volumes');
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
