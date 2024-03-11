import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { geNetworkData, CreateNetwork, AddVolume, ImportImage, ListofImages, CreateImage, ApiCall_GET } from '../Redux/Auth/action'//APi Redux function import
import { ApiCall_POST, DeleteVolume, RemoveUnusedVolume } from '../Redux/Volume/action'//APi Redux function import
import "./header.css";
import json from '../jsondata.json';
import Swal from 'sweetalert2';
import logo from '../Assets/logo.png';
import './Loader.css'; // Import the CSS for the loader

export const Home = ({ geNetworkData, Networklist, ImportImg, containerLists,
  RemoveUnusedVolume,
  ImportImage, ListofImages,
  ApiCall_POST, ApiCall_GET
}, props) => {

  const [activePopup, setActivePopup] = useState(null);
  const [popupCardNetwork, setPopupCardNetwork] = useState(true)
  // LIst of Images  ----------------------
  const [runPopupVisible, setRunPopupVisible] = useState({ isopen: false, id: "", name: '' });
  const [popupCard, setPopupCard] = useState(true);
  const [listImgData, setListImgData] = useState('');
  const [draggedCards, setDraggedCards] = useState([]);
  // const [running, setRunning] = useState('NOT RUNNING')
  const [optionalData, setOptionalData] = useState(false)
  const [loading, setLoading] = useState(false);


  const [containerData, setcontainerData] = useState(containerLists);

  //handle refresh
  const handleRefresh = () => {
    window.location.reload();
    // setConnectIP(prevCounter => prevCounter + 1);
  };

  const preStyle = {
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
  };


  // const [popupCard, setPopupCard] = useState(true);
  // Sidebar Handler
  const handlePopupChange = (popupName) => {
    if (popupName === 'containers') {
      AllcontainerHandler()
      // ContainerList()
    }

    if (popupName === 'listImgPopup') {
      if (!listImgData) {
        setLoading(true)
      }
      setPopupCard(true)
      const requestData = {
        // connectIp: connectIp // Ensure this corresponds to the expected field in the backend
        connectIp: '18.215.172.120' // Ensure this corresponds to the expected field in the backend
      };
      debugger
      ApiCall_POST('http://localhost:5000/execute-ssh', requestData, true)
        .then(function (payload) {
          setLoading(false)
          debugger
          setListImgData(payload)
          console.log(listImgData);
          // setListImgData(json)
        })
        .catch(function (error) {
          console.error('Error fetching Images', error);
          Swal.fire({
            icon: 'error',
            title: 'Error while fetching Images. ',
            showConfirmButton: false,
            timer: 1500,
          });
          // Handle the error
        });
      // setListImgData(json)
    }
    if (popupName === 'networkPopup') {
      setPopupCardNetwork(true)
      geNetworkData()
      setInspectPopup(false)
    }
    if (popupName === 'listofvolume') {
      // setvolumList(true)
      setPopupvolumList(true)
      ApiCall_POST('http://localhost:5000/volume-list', null, true).then(function (response) {
        console.log("response.Volumes", response,);
        setVolumeList(response.Volumes)
        // bloodinfo = response
      });

    }
    setActivePopup(popupName);
  };

  const [importImg, setImportImg] = useState('');
  const [containerListInspect, setContainerListInspect] = useState('')


  // test api calls  =======================
  useEffect(() => {
    AllcontainerHandler()
    // ContainerList()
    geNetworkData()
    ImportImage()
    volumeDropdownHandler()
    // setcontainerData(containerLists)

  }, [])

  // Create Image
  // UPload Folder
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedSpecificFile, setSelectedSpecificFile] = useState(null);
  const [imgPath, setImgPath] = useState('');
  const [createTag, setCreateTag] = useState('');


  const volumeDropdownHandler = () => {
    ApiCall_POST('http://localhost:5000/volume-list', null, true).then(function (response) {
      console.log("response.Volumes", response,);
      setVolumeList(response.Volumes)
      // bloodinfo = response
    });
  }

  const convertHandler = () => {
    if (imgPath !== "" && createTag !== "") {
      // CreateImage(selectedFiles)
      const requestData = {
        imagePath: imgPath, // Assuming the API expects a 'path' field in the request payload
        ImageTag: createTag
      };
      debugger
      ApiCall_POST('http://localhost:5000/initiate-docker-build', requestData, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'container Created Sucessfully.',
            showConfirmButton: false,
            timer: 1500
          });
          debugger
          setImgPath('')
          setCreateTag('')

        })
        .catch(function (error) {
          console.error('Error inspecting container:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error Creating container',
            showConfirmButton: false,
            timer: 1500
          });
          // Handle the error

        });
    }

    if (selectedSpecificFile) {
    }

    setSelectedFiles('')
    setSelectedSpecificFile('')

    setSelectedFolder(null)
  };
  const convertCancle = () => {
    setSelectedFiles('')
    setSelectedSpecificFile('')

    setSelectedFolder(null)
  };

  // List of Images
  // in run pop host option
  const [hostshow, setHostShow] = useState(false)
  const [voluemShow, setVoluemShow] = useState(false)

  // create image data
  const [host, setHost] = useState('')
  const [container, setContainer] = useState('')
  useEffect(() => {
    setPort(prevPort => ({
      ...prevPort,
      host: host,
      container: container
    }));
  }, [host, container]);


  const [port, setPort] = useState({ host: '', container: '' });

  const [envVariableData, setEnvVariableData] = useState([])
  const [variable, setVariable] = useState()
  const [value, setValue] = useState()
  const [VolumeList, setVolumeList] = useState();


  const [createImgVolumes, setCreateImgVolumes] = useState()
  const [imgName, setImgName] = useState()

  const AddEnvirnomentHandler = () => {
    setVoluemShow(true)
    const data = {
      name: variable,
      value: value
    }
    if (data.name && data.value) {
      setEnvVariableData(prevData => [...prevData, data]);
      console.log('data', data)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Enter  Envirnoment Variables.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  const closeContainerbtn = () => {
  setEnvVariableData([])
  setRunPopupVisible(false)
  setVariable(null)
  setValue(null)
  }

  const createHandler = (id, name) => {
    debugger
    const requestData = {
      imgId: id,
      imgName: name,
      ContainerName: imgName, // Assuming the API expects a 'containerId' field in the request payload
      Ports: port,
      Volume: createImgVolumes,
      Env: envVariableData,
    };

    if (requestData) {
      ApiCall_POST('http://localhost:5000/Create-container', requestData, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'container Created Sucessfully.',
            showConfirmButton: false,
            timer: 1500
          });
          AllcontainerHandler()
          setEnvVariableData([])
          setVariable(null)
          setValue(null)
          // ContainerList()
          setRunPopupVisible(false)
        })
        .catch(function (error) {
          console.error('Error creating container', error);
          Swal.fire({
            icon: 'error',
            title: 'Error creating container',
            showConfirmButton: false,
            timer: 1500
          });

          // Handle the error

        });
      setRunPopupVisible(false)

    }
    // setPath()
    console.log(requestData, "--------------requestData------------------");
    debugger
  }
  // End



  //  dragand drop 
  const allowDrop = (e) => {
    e.preventDefault();

  };
  // drag and drop
  const AllImagesHandler = (e) => {
    const requestData = {
      // connectIp: connectIp // Ensure this corresponds to the expected field in the backend
      connectIp: '18.215.172.120' // Ensure this corresponds to the expected field in the backend
    };
    ApiCall_POST('http://localhost:5000/execute-ssh', requestData, true)
      .then(function (payload) {
        setListImgData(payload)

      })

  };
  const UsesImagesHandler = () => {
    debugger
    ApiCall_POST('http://localhost:5000/Used-images', null, true)
      .then(function (payload) {
        setListImgData(payload)
      })
      .catch(function (error) {
        console.error('Error Unused image', error);
        // Handle the error

      });

  };
  const UnUsesImagesHandler = () => {
    ApiCall_POST('http://localhost:5000/Unused-images', null, true)
      .then(function (payload) {
        setListImgData(payload)
      })
      .catch(function (error) {
        console.error('Error Unused image', error);
        // Handle the error

      });
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    const cardText = e.dataTransfer.getData('text/plain'); // Assuming cardText is a string
    // Initialize cardText as an array and push filteredData into it
    console.log(cardText, "-----1");
    const filteredData = listImgData.filter((item) =>
      item.Id === cardText
    );
    debugger
    if (draggedCards.length <= 11 && draggedCards?.filter(x => x.Id === cardText).length === 0) {
      var dd = draggedCards.concat(filteredData)
      setDraggedCards(dd);
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);//0,1,2,3

  };
  const [showHubBtn, setShowHubBtn] = useState({ isopen: false, id: "", });

  const tagHandler = (name, id) => {
    const requestData = {
      tagName: name && name[0] ? name[0].split(':')[0] : 'nginx2' // Assuming the API expects a 'containerId' field in the request payload
    };
    setShowHubBtn({ isopen: false, id })
    debugger

    ApiCall_POST('http://localhost:5000/tag-image', requestData, true)
      .then(function (payload) {
        Swal.fire({
          icon: 'success',
          title: 'Success tagging image.',
          showConfirmButton: false,
          timer: 1500
        });

      })
      .catch(function (error) {
        console.error('Error tagging image', error);
        // Handle the error

      });
    // remove below after seting backend -start
    const elements = document.querySelectorAll('.show');
    elements.forEach(element => {
      element.classList.remove('show');
    })
    //------------------------- End


  }
  const pushtoHub = (name) => {
    // x.RepoTags && x.RepoTags[0] ? x.RepoTags[0].split(':')[0] : ''
    const requestData = {
      pushImageName: name && name[0] ? name[0].split(':')[0] : 'nginx2', // Assuming the API expects a 'containerId' field in the request payload

    };

    ApiCall_POST('http://localhost:5000/export-image', requestData, true)
      .then(function (payload) {
        Swal.fire({
          icon: 'success',
          title: 'Export Image Sucess.',
          showConfirmButton: false,
          timer: 1500
        });

      })
      .catch(function (error) {
        console.error('Error exporting image', error);
        // Handle the error

      });
  }

  const DeleteImageHandler = (id) => {
    const requestData = {
      imageId: id // Assuming the API expects a 'containerId' field in the request payload

    };
    debugger

    ApiCall_POST('http://localhost:5000/delete-image', requestData, true)
      .then(function (payload) {
        Swal.fire({
          icon: 'success',
          title: 'Image Deleted Sucessfull.',
          showConfirmButton: false,
          timer: 1500
        });

      })
      .catch(function (error) {
        console.error('Error Deteting Image:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error Deteting Image:',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle the error

      });

  }



  // ===
  const [logsInsSwitch, setLogsInsSwitch] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState('');

  const handleSelectChange = (e) => {
    setSelectedNetwork(e.target.value);
  };

  const handleConnectclose = (id) => {
    setConnectpopup(false)
    setdisConnectpopup(false)

  }



  // Import Image section==================
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    const requestData = {
      imageName: search // Assuming the API expects a 'containerId' field in the request payload
    };
    debugger
    ApiCall_POST('http://localhost:5000/search-image', requestData, true)
      .then(function (payload) {
        setImportImg(payload);
      })
      .catch(function (error) {
        console.error('Error inspecting container:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error searching Image',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle the error
      });
  };

  const ImportImageHandler = (id) => {
    debugger
    const filteredData = importImg.filter((item) => item.name === id);
    setNetworklist(filteredData);
    const requestData = {
      importImgName: id // Assuming the API expects a 'containerId' field in the request payload
    };
    if (requestData) {
      ApiCall_POST('http://localhost:5000/import-image', requestData, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Pull-Image Sucess.',
            showConfirmButton: false,
            timer: 1500
          });
          // console.log("payload---001", payload, "payload---001");

        })
        .catch(function (error) {
          console.error('Error inspecting container:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error Imorting Image',
            showConfirmButton: false,
            timer: 1500
          });
          // Handle the error

        });
    }
  }

  const AllcontainerHandler = () => {
    ApiCall_POST('http://localhost:5000/container-list', null, true)
      .then(function (payload) {
        setcontainerData(payload)
        console.log("payload---001", payload, "payload---001");
      })
      .catch(function (error) {
        console.error('Error inspecting container:', error);
        // Handle the error

      });
  }
  const containerHandler = (id) => {


    if (id === "run") {
      ApiCall_POST('http://localhost:5000/running-container', null, true)
        .then(function (payload) {
          setcontainerData(payload)

          console.log("payload---002", payload, "payload---002");

        })
        .catch(function (error) {
          console.error('Error inspecting container:', error);
          // Handle the error

        });
    }

    if (id === "stop") {
      ApiCall_POST('http://localhost:5000/stopped-container-list', null, true)
        .then(function (payload) {
          console.log("payload---003", payload, "payload---00");
          setcontainerData(payload)
        })
        .catch(function (error) {
          console.error('Error inspecting container:', error);

          // Handle the error

        });
    }
  }


  const StartContainerHandler = (Id) => {
    const requestData = {
      containerId: Id // Assuming the API expects a 'containerId' field in the request payload
    };
    debugger
    // change name
    ApiCall_POST('http://localhost:5000/start-container', requestData, true)
      .then(function (payload) {
        AllcontainerHandler()
        // ContainerList()
        Swal.fire({
          icon: 'success',
          title: 'Container Started.',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(function (error) {
        console.error('Error start container:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error Starting Container',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle the error

      });
  }

  const StopContainerHandler = (Id) => {
    const requestData = {
      containerId: Id // Assuming the API expects a 'containerId' field in the request payload
    };


    ApiCall_POST('http://localhost:5000/stop-container', requestData, true)
      .then(function (payload) {
        // ContainerList()
        AllcontainerHandler()
        console.log("---StopContainerHandler", payload);
        // Handle the response as needed
        Swal.fire({
          icon: 'success',
          title: 'Container has been Stoped.',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(function (error) {
        console.error('Error stopping container:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error Stoping Container',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle the error
      });

  };
  const RestartContainerHandler = (Id) => {
    const requestData = {
      containerId: Id // Assuming the API expects a 'containerId' field in the request payload
    };

    ApiCall_POST('http://localhost:5000/restart-container', requestData, true)
      .then(function (payload) {
        // ContainerList()
        AllcontainerHandler()
        console.log("---restar", payload);
        Swal.fire({
          icon: 'success',
          title: 'Container Restarted Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(function (error) {
        console.error('Error restaring Failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error Restarting Container',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle the error
      });


  }
  const DeleteContainerHandler = (Id) => {
    const requestData = {
      containerId: Id // Assuming the API expects a 'containerId' field in the request payload
    };


    ApiCall_POST('http://localhost:5000/removing-container', requestData, true)
      .then(function (payload) {
        AllcontainerHandler()
        // ContainerList()
        // console.log("---restar", payload);
        Swal.fire({
          icon: 'success',
          title: 'Container has been Deleted.',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(function (error) {
        console.error('Error Deleting container', error);
        Swal.fire({
          icon: 'error',
          title: 'Error Deleting Container',
          showConfirmButton: false,
          timer: 1500
        });
        // Handle the error

      });
  }


  // Network section==================
  // list of network
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [containerInspectOption, setContainerInspectOption] = useState('');
  const [inspectPopup, setInspectPopup] = useState(false);
  const [networklist, setNetworklist] = useState(Networklist);
  const [volumInspect, setVolumInspect] = useState('');
  const [networkINspect, setNetworkINspect] = useState('');
  // container states
  const [containerInspect, setContainerInspect] = useState('')
  const [ContainerStats, setContainerStats] = useState('')
  const [ContainerLogs, setContainerLogs] = useState('')

  //options function to handle containers logs, stats. inspect
  const handleContainerInspectOptions = (option) => {
    debugger
    if (option === 'stats') {
      setContainerInspectOption('1')
    } else if (option === 'inspect') {
      setContainerInspectOption('2')
    } else if (option === 'logs') {
      setContainerInspectOption('3')
    }
  }

  //  Common Inspect/Log method
  const handleOptionSelect = (option, id) => {
    debugger
    setSelectedOption(option);
    setIsDropdownOpen(false);

    if (option === 'Inspect' && Networklist) {
      setInspectPopup(true);
      const filteredData = Networklist.filter((item) => item.Id === id);
      setNetworklist(filteredData);

      // Assuming 'id' needs to be sent in the request body
      const requestData = {
        networkId: id // Ensure this corresponds to the expected field in the backend
      };

      ApiCall_POST('http://localhost:5000/inspect-network', requestData, true)
        .then(function (payload) {
          setNetworkINspect(payload)
          console.log(payload, "payload");
          setPopupCardNetwork(false)
        })
        .catch(function (error) {
          console.error('Error inspecting Network:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error Inspecting Network.',
            showConfirmButton: false,
            timer: 1500
          });
          // Handle the error
        });
    }
    if (option === 'Delete' && Networklist) {
      const requestData = {
        networkId: id // Ensure this corresponds to the expected field in the backend
      };
      ApiCall_POST('http://localhost:5000/removing-network', requestData, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Network has been Deleted.',
            showConfirmButton: false,
            timer: 1500
          });
          setPopupCardNetwork(true)
          geNetworkData()
          setInspectPopup(false)
        })
        .catch(function (error) {
          console.error('Error Deleting Network:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error Deleting Network.',
            showConfirmButton: false,
            timer: 1500
          });
        });
    }


    // inspect container
    if (option === 'CInspect' || option === 'Clogs' || option === 'CStats' && draggedCards) {
      debugger
      setIsDropdownOpen(false)
      const filteredData = containerData?.filter((item) =>
        item.Id === id
      );
      setContainerListInspect(filteredData)
      console.log(filteredData, "filteredData");
      // 
      const requestData = {
        containerId: id // Ensure this corresponds to the expected field in the backend
      };
      if (option === 'CStats') {
        setContainerInspectOption('1')
      } else if (option === 'CInspect') {
        setContainerInspectOption('2')
      } else if (option === 'Clogs') {
        setContainerInspectOption('3')
      }
      debugger
      if (option === 'CInspect' || option === 'Clogs' || option === 'CStats') {
        //Inspect API
        debugger
        ApiCall_POST('http://localhost:5000/inspect-container', requestData, true)
          .then(function (payload) {
            setContainerInspect(payload)
            console.log(payload, "setContainerInspect Payload");
          })
          .catch(function (error) {
            console.error('Error in inspecting container', error);

          });

        //Stats API
        ApiCall_POST('http://localhost:5000/container-stats', requestData, true)
          .then(function (payload) {
            setContainerStats(payload)
            console.log(payload, "setContainerStats payload");
          })
          .catch(function (error) {
            console.error('Error in fetching container stats:', error);


          });

        //Logs API
        debugger
        ApiCall_POST('http://localhost:5000/container-logs', requestData, true)
          .then(function (payload) {
            // setContainerList(payload)
            setContainerLogs(payload)
            console.log(payload, "setContainerLogs Payload");
          })
          .catch(function (error) {
            console.error('Error in fetching logs of container:', error);

          });
      }
    }

    if (option === 'VDelete' && VolumeList) {
      const requestData = {
        volName: id // Ensure this corresponds to the expected field in the backend
      };
      ApiCall_POST('http://localhost:5000/removing-volume', requestData, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Volume deleted Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          handlePopupChange('listofvolume')
        })
        .catch(function (error) {
          console.error('Error removing volume:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error in removing volume',
            showConfirmButton: false,
            timer: 1500
          });
        });
    }

    if (option === 'vInspect' && VolumeList) {
      setInspectPopup(true);
      const requestData = {
        volName: id // Ensure this corresponds to the expected field in the backend
      };
      const filteredData = VolumeList.filter((item) =>
        item.Name === id
      );

      setVolumInspect(filteredData)

      ApiCall_POST('http://localhost:5000/inspect-volume', requestData, true)
        .then(function (payload) {
          // setVolumInspect(payload)
          setPopupvolumList(false)

        })
        .catch(function (error) {
          console.error('Error inspecting volume:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error while inspecting volume',
            showConfirmButton: false,
            timer: 1500
          });
          // Handle the error
        });

    }

  };

  const containerDelHandler = (option) => {
    ApiCall_POST('http://localhost:5000/delete-stopped-containers', null, true)
    .then(function (payload) {
      Swal.fire({
        icon: 'success',
        title: 'Stopped Container Deleted Sucessfully.',
        showConfirmButton: false,
        timer: 1500
      });
      AllcontainerHandler()
    })
    .catch(function (error) {
      console.error('Error in Deleting Stopped Containers:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error in Deleting Stopped Containers',
        showConfirmButton: false,
        timer: 1500
      });
      // Handle the error
    });

  }

  const [connectpopup, setConnectpopup] = useState(false, { id: '' })
  const [disConnectpopup, setdisConnectpopup] = useState(false, { id: '' })
  const [contId, setcontId] = useState('')

  const popupConnectHandler = (id) => {
    setcontId(id)
    setConnectpopup(true)

  }
  const popupDixconnectHandler = (id) => {
    setcontId(id)
    setdisConnectpopup(true)

  }
  const handleConnectContainer = () => {
    // Use the selectedNetwork value here (e.g., send it to an API)
    console.log('Selected Network:', selectedNetwork)
    const filteredData = Networklist.filter((item) => item.Name === selectedNetwork);
    // setSelectedNetwork(filteredData);
    const requestData = {
      containerId: contId, // Assuming the API expects a 'containerId' field in the request payload
      networkName: filteredData[0].Name, // Assuming the API expects a 'containerId' field in the request payload
    };
    
    if (requestData) {
      ApiCall_POST('http://localhost:5000/Connect-container', requestData, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Container Connected Sucessfully.',
            showConfirmButton: false,
            timer: 1500
          });
          setConnectpopup(false)
        })
        .catch(function (error) {
          console.error('Error Connect container:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error in Connecting Container.',
            showConfirmButton: false,
            timer: 1500
          });
          // Handle the error
        });
    }
  }

  const handleDisConnectContainer = (id) => {
    // setConnectpopup(true)
    debugger
    console.log('Selected Network:', selectedNetwork)
    const filteredData = Networklist.filter((item) => item.Name === selectedNetwork);
    // setSelectedNetwork(filteredData);
    const requestData = {
      containerId: contId, // Assuming the API expects a 'containerId' field in the request payload
      networkName: filteredData[0].Name, // Assuming the API expects a 'containerId' field in the request payload
    };

debugger
    ApiCall_POST('http://localhost:5000/Disconnect-container', requestData, true)
      .then(function (payload) {
        Swal.fire({
          icon: 'success',
          title: 'Container has been Successfully Disconnected.',
          showConfirmButton: false,
          timer: 1500
        });


      })
      .catch(function (error) {
        console.error('Error Disconnecting Container', error);
        Swal.fire({
          icon: 'error',
          title: 'Error in Disconnecting Container',
          showConfirmButton: false,
          timer: 1500
        });
      });


  }

  // create network 
  const [addnetworkname, setAddnetworkname] = useState({ name: '', value: '' });

  const [CreateNetworkPopup, setcreateNetworkPopup] = useState(false);

  const handleAddNetwork = (e) => {
    const { name, value } = e.target;
    setAddnetworkname({
      ...addnetworkname,
      [name]: value,
    });
    console.log(addnetworkname)
  };

  const creatNEtworkHandler = () => {
    const { name } = addnetworkname;
    if (name) {
      ApiCall_POST('http://localhost:5000/Create-network', addnetworkname, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Network has been Created Successfully',
            showConfirmButton: false,
            timer: 1500
          });
          console.log('CreateNetwork', payload);
          setAddnetworkname({ name: '', value: '' })
        })
        .catch(function (error) {
          console.error('Error creating network:', error);
          // Handle error scenario here
          Swal.fire({
            icon: 'error',
            title: 'Failed to create network',
            text: 'An error occurred while creating the network.',
            showConfirmButton: false,
            timer: 1500
          });
          setAddnetworkname({ name: '', value: '' })
          // Optionally, setCreateNetworkPopup(false) if creation failed
        });
    } else {
      // Handle case when name is not present in addnetworkname
      console.error('Name is required for network creation');
      Swal.fire({
        icon: 'error',
        title: 'Name is required',
        text: 'Please provide a name to create the network'
      });
    }
  };


  // Create NetworkPopup Handler close and api call
  const NetworkPopupOpen = (popupCardNetwork) => {
    setcreateNetworkPopup(false)
    if (activePopup === 'networkPopup') {
      setPopupCardNetwork(true)
    }
    setActivePopup(popupCardNetwork);
  };

  // addVolumeHandler
  const [popupvolumList, setPopupvolumList] = useState(true)
  const [addVolumeForm, setAddVolumeForm] = useState(null);

  const handleAddVolume = (e) => {
    const { name, value } = e.target;
    console.log(name)

    setAddVolumeForm({
      ...addVolumeForm,
      [name]: value,
    });
  }

  const addVolumeHandler = () => {
    debugger
    if (addVolumeForm) {
      ApiCall_POST('http://localhost:5000/Create-volume', addVolumeForm, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Volume has been saved.',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(function (error) {
          console.error('Error creating Volme:', error);
          // Handle error scenario here
          Swal.fire({
            icon: 'error',
            title: 'Failed to create Volume',
            text: 'An error occurred while creating the Volume'
          });
          // Optionally, setCreateNetworkPopup(false) if creation failed
        });
    } else {
      // Handle case when name is not present in addnetworkname
      console.error('Name is required for Volume creation');
      Swal.fire({
        icon: 'error',
        title: 'Name is required',
        text: 'Please provide a name to create the volume'
      });
      // Optionally, setCreateNetworkPopup(false) if name is not present
    }
  }


  const unusedhandler = (option) => {
    debugger
    if (option === 'network') {
      ApiCall_POST('http://localhost:5000/Delete-unused-Networks', null, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Unused networks have been deleted',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(function (error) {
          console.error('Error deleting unused network:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete unused networks',
            text: 'An error occurred while deleting unused networks'
          });

        });

    } else if (option === 'volume') {
      ApiCall_POST('http://localhost:5000/Delete-unused-volume', null, true)
        .then(function (payload) {
          Swal.fire({
            icon: 'success',
            title: 'Unused volumes have been deleted',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(function (error) {
          console.error('Error deleting unused volumes:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to delete unused volumes',
            text: 'An error occurred while deleting unused volumes'
          });

        });
    }
  }


  const [connectIp, setConnectIP] = useState('');
  const ipHandler = (e) => {
    const { value } = e.target;
    console.log(value, "ip")
    setConnectIP(value);

  }

  const ConnectHandler = () => {
    if (connectIp) {
      const requestData = {
        connectIp: connectIp // Ensure this corresponds to the expected field in the backend
      };
      ApiCall_POST('http://localhost:5000/execute-ssh', requestData, true)
        .then(function (payload) {
          console.log("---payload", requestData);
          Swal.fire({
            icon: 'success',
            title: 'Server has been connected',
            showConfirmButton: false,
            timer: 1500
          })
          // handleRefresh()
        })
        .catch(function (error) {
          console.error('Error Connection:', error);
          // Handle the error
          Swal.fire({
            icon: 'error',
            title: "Couldn't connect server",
            showConfirmButton: false,
            timer: 1500
          })
        });
    } else {
      console.error('Ip Address is required for establishing connection');
      Swal.fire({
        icon: 'error',
        title: 'Ip Address is required',
        text: 'Please provide an Ip Address to establish connection'
      });
    }

  }

  return (

    <div style={{ height: '100%', backgroundColor: '#475E6E', padding: "45px 0px 0px 0px " }} className='flex height '>
      {/* {loading && <div className="loader"></div>} */}
      {/* <Sidebar /> */}
      <div height={{ height: '100%' }} className="nav relative  items-center flex flex-col bg-teal-200 scrollbar overflow-auto scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500">

        <div className='w-full p-2 flex flex-col pb-6'>
          <p className='text-3xl my-2 text-center text-teal-400'>Connect</p>
          <input onChange={ipHandler} name="connectIp" type="text" className="text-white ip my-2 w-full p-2 rounded-md border-b item-center" placeholder="192.168.0.0"></input>
          <button onClick={() => ConnectHandler()} type="button" className=" font-semibold bg-teal-400  p-1 text-md w-full rounded-md">Connect</button>

          {/* Tabs Section */}
          <button className="w-full mt-3 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handlePopupChange('Uploadpopup')}>
            <span className='mr-3'>Create Image</span>
          </button>
          <button
            onClick={() => handlePopupChange('listImgPopup')}
            className="w-full text-white hover:bg-teal-400  font-bold py-2 px-4 rounded flex justify-between items-center">
            <span className='mr-3'>List of Images</span>
            <svg className="fill-current w-4 h-4 mr-0 " viewBox="0 0 80 40">
              <rect width="60" height="10"></rect>
              <rect y="20" width="60" height="10"></rect>
              <rect y="40" width="60" height="10"></rect>
            </svg>
          </button>
          <button
            onClick={() => handlePopupChange('containers')}
            className="w-full text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
            <span className='mr-3'>List of Containers</span>

          </button>

          <button
            onClick={() => handlePopupChange('importImgPopup')}
            className="w-full text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
            <span className='mr-3'>Import Image</span>

          </button>
          <button className="w-full text-teal-400   font-bold py-2 px-4 rounded inline-flex items-center">
            <span className='mr-3 '>Create Network</span>
          </button>
          <input
            onChange={handleAddNetwork}
            name="name"
            // onChange={(e) => setnetworkname(e.target.value)}
            type="text" className="text-white ip my-2 w-full p-1 rounded-md item-center" placeholder="Network Name..." />
          <button type="button" className=" font-semibold bg-teal-400  p-1 text-md w-full hover:bg-teal-300 rounded-md"
            onClick={creatNEtworkHandler}>Create</button>


          <button
            onClick={() => handlePopupChange('networkPopup')}
            className="mt-2 w-full text-white hover:bg-teal-400  font-bold py-2 px-2 rounded flex justify-between items-center">
            <span className='ml-2'>List of Networks</span>
            <svg className="fill-current w-4 h-4 mr-2" viewBox="0 0 80 40">
              <rect width="60" height="10"></rect>
              <rect y="20" width="60" height="10"></rect>
              <rect y="40" width="60" height="10"></rect>
            </svg>
          </button>
          <button className="w-full text-teal-400   font-bold py-2 px-4 rounded inline-flex ">
            <span className='mr-3 '>Create Volumes</span>
          </button>
          <input
            onChange={handleAddVolume}
            name="name"
            type="text"
            className="text-white ip my-2 w-full p-1 rounded-md item-center" placeholder="Volumes Name..." />
          <button type="button" className=" font-semibold bg-teal-400  p-1 text-md w-full hover:bg-teal-300 rounded-md"
            // onClick={creatNEtworkHandler}
            onClick={addVolumeHandler}
          >Create</button>


          <button
            onClick={() => handlePopupChange('listofvolume')}
            className="w-full mt-2 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex justify-between items-center">
            {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
            <span className='mr-3'>List of Volumes</span>
            <svg className="fill-current w-4 h-4  " viewBox="0 0 80 40">
              <rect width="60" height="10"></rect>
              <rect y="20" width="60" height="10"></rect>
              <rect y="40" width="60" height="10"></rect>
            </svg>
          </button>



          {CreateNetworkPopup &&
            <div style={{ left: ' 260%' }} className=" popup h-52 w-80 items-center ">
              {addVolumeForm ?
                <label className='text-white text-center items-center'>Volume Created Succesfully! </label>
                :
                <label className='text-white text-center items-center'>Network Created Succesfully! </label>
              } <button className="mt-8 w-40 bg-teal-400 hover:bg-teal-300 font-bold py-1 px-4 rounded  items-center" onClick={() => NetworkPopupOpen()}>
                ok
              </button>
            </div>
          }
        </div>

        <div className="w-full hidden footer absolute bottom-0  bg-teal-400 flex justify-center p-2">
          <img src={logo} className="bottom-img shadow self-center" alt="img" />
        </div>
      </div>

      {/* Main component*/}
      <div className="App flex justify-items-center items-center flex-col w-full   " >
        {/* Upload folder Section */}
        {activePopup === 'Uploadpopup' &&
          <div className=" popup  w-4/12 items-center ">
            {selectedFolder && selectedFiles || selectedSpecificFile ? (
              <div className=''>
                <h4 className='text-teal-400  mb-4'>File to Image Conversion</h4>

                <div className='flex w-full'><svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 0H2C0.9 0 0 0.9 0 2V16H2V2H14V0ZM13 4L19 10V20C19 21.1 18.1 22 17 22H5.99C4.89 22 4 21.1 4 20L4.01 6C4.01 4.9 4.9 4 6 4H13ZM12 11H17.5L12 5.5V11Z" fill="#E2E2E2" />
                </svg>
                  {selectedFiles && selectedFiles.length > 0 && (
                    <div className='w-full'>
                      <h3 className='text-teal-400 text-center items-center my-4 '>Selected Files:</h3>
                      <ul className='h-40  overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500'>
                        {selectedFiles?.map((file, index) => (
                          <li className='text-gray-200' key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedSpecificFile && (
                    <div>
                      <h3 className='text-teal-400 text-center items-center my-4'>Selected Specific File:</h3>
                      <p className='text-white'>{selectedSpecificFile.name}</p>
                    </div>
                  )}
                </div>
                {/* <p className='text-white'>{webkitRelativePath}</p> */}
                <p className='text-gray-400 mt-4 text-sm'> Press convert if you want to convert the file into an Image or Cancel if you’re not sure yet</p>
                {/* <input type="file" webkitdirectory="" onChange={} /> */}
                <div className='flex justify-center mt-8 '>
                  {/* <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-bold py-1 px-4 rounded items-center"
                    onClick={convertHandler}  > Convert</button> */}
                  <button className=" bg-gray-400 hover:bg-gray-300 font-bold py-1 px-4 rounded items-center" onClick={convertCancle}>Cancel  </button></div>
              </div>
            ) : (
              <div className='flex flex-col items-center'>

                <label className=' text-teal-400 text-2xl font-medium my-2' > Create Image</label>
                <label className='text-white  items-center my-4' >Enter Complete Path of File with File Name to Convert it into an Image</label>

                <input name="path" onChange={(e) => setImgPath(e.target.value)} type='text' placeholder=' e.g. F://myFolder//myfile.tar.gz' className={'bg-white-600 text-gray-200 w-full mb-3 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                <input name="path" onChange={(e) => setCreateTag(e.target.value)} type='text' placeholder=' Image Tag here' className={'bg-white-600 text-gray-200 w-full mb-3 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                <label className='text-yellow-300 text-sm   mb-4' > note: File should have .tar.gz extension to work.</label>



                <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                  onClick={convertHandler}  >Create Image</button>


              </div>
            )}
          </div>
        }
        {/* List of Images Section */}
        {activePopup === 'listImgPopup' &&
          <div className="w-full  h-full">
            {/* <button onClick={() => { setPopupCard(true) }} className=' absolute bg-gray-400 px-2 rounded'>show list</button> */}
            {popupCard &&
              <div id='pop1' className="p-2 popup-main  shadow rounded overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 ">
                {!listImgData && loading && <div className="loader"></div>}

                <button onClick={() => { setPopupCard(false) }} className='bg-gray-300 px-2 rounded'>X</button>
                <div className='flex justify-between items-center  p-2'>
                  <button onClick={() => { AllImagesHandler() }} className='bg-gray-300 hover:bg-gray-200 px-2 w-16 '>All</button>
                  <button onClick={() => { UsesImagesHandler() }} className='bg-gray-300 hover:bg-gray-200 px-2 w-16'>Used</button>
                  <button onClick={() => { UnUsesImagesHandler() }} className='bg-gray-300 hover:bg-gray-200 px-2 w-16'>Unused</button>


                </div>
                {/* Popup cards */}

                {listImgData && listImgData?.map((x, y) => (
                  <div key={y} className="mb-2 flex justify-between bg-gray-700 items-center p-2  " id='0'
                    draggable="true"
                    // onDragStart={(e) => handleDragStart(e, y)}
                    onDragStart={(e) => handleDragStart(e, x.Id)}
                  >
                    <div className='flex w-2/3 mr-2'>
                      <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                      </svg>

                      <div className='ml-3 py-2'>
                        <label className='text-white text-sm font-semibold w-32 truncate overflow-hidden'> {x.RepoTags && x.RepoTags[0] ? x.RepoTags[0].split(':')[0] : 'nginx2'}</label>
                        <p className='text-teal-400 text-sm w-32 truncate'>{x.Command}</p>
                      </div>
                    </div>

                    <div className='w-1/3  '>
                      <div className=' mb-2 flex-col'>
                        <button type="button" className=" font-semibold bg-teal-400 py-1 px-2 text-sm  hover:bg-teal-200 rounded-md mb-1"
                          onClick={() => tagHandler(x.RepoTags, x.Id)}
                        >Tag Image</button>
                        {showHubBtn.id === x.Id && < button id={x.Id} type="button" className="show font-semibold bg-teal-400 py-1 px-2 text-sm  hover:bg-teal-300 rounded-md"
                          onClick={() => pushtoHub(x.RepoTags)}
                        >Push To Hub</button>}
                      </div>
                    </div>
                  </div>
                ))}


              </div>
            }
            {/* List of images Inspect dta======================== */}

            {selectedOption === 'Clogs' || selectedOption === 'CInspect' ? (
              <div className='w-11/12 mt-5 m-auto'>
                {containerListInspect && containerListInspect.map((x, y) => (
                  <div className='w-11/12 mt-5 m-auto'>
                    <div className='flex justify-center py-2 w-full justify-between'>
                      <div className='flex items-center'>
                        <svg onClick={() => {
                          setSelectedOption(false);
                          setPopupCard(true)
                        }} className='mr-5 cursor-pointer' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                        </svg>

                        <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                        </svg>

                        <label className='overflow-hidden w-32 ml-3 text-white text-md font-semibold'>{x.Names}</label>
                      </div>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                      </svg>

                    </div>
                    <label onClick={() => setLogsInsSwitch(true)} className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3 mr-3'>Logs</label>
                    <label onClick={() => setLogsInsSwitch(false)} className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3'>Inspect</label>
                    {logsInsSwitch ?
                      <>
                        {!ContainerStats &&
                          <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                            <div className=' text-left p-1  mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>4/8/2020 2:20:554</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>User-001 192.168.10.10 GET https://encyclopedia.com/</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>4/8/2020 2:20:55</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>User-001 192.168.10.10 GET https://encyclopedia.com/</p>
                            </div>
                            <div className=' text-left p-1  mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>4/8/2020 2:20:55</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>User-001 192.168.10.10 GET https://encyclopedia.com/</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>4/8/2020 2:20:55</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>User-001 192.168.10.10 GET https://encyclopedia.com/</p>
                            </div>

                          </div>
                        }
                      </>
                      :

                      <>

                        {containerInspect &&
                          < div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                            <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Path </p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Path}</p>
                            </div>
                            <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Version</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Args}</p>
                            </div>
                            <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Created</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Created}</p>
                            </div>
                            <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Driver</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Driver}</p>
                            </div>
                            {/* <h2 className=" font-bold mt-2">Port</h2>

                            <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>80/tcp</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.0.0.0.:50005</p>
                            </div> */}
                          </div>
                        }
                      </>}
                  </div>))
                }
              </div>
            )
              :
              <div className="overflow-hidden flex flex-wrap h-full w-full"
                onDrop={handleDrop}
                onDragOver={allowDrop}
              >
                {draggedCards && draggedCards.map((x, index) => (
                  <div key={index} className="dragged-card md:w-2/6 md:h-40 sm:h-full sm:w-full  flex flex-col  justify-center items-center ">

                    <div style={{ width: '270px' }} className=" h-4/6 w-4/6 m-1 card-bg-color  flex flex-col justify-center" id={"card_" + index}>
                      {/* <div className='flex justify-between items-center mx-3'>
                        <label className='text-teal-400 text-right text-sm pr-4'> {x.State} </label>
                        <div className="inline-block relative">
                          <button onClick={() => setIsDropdownOpen(index)} type="button" >
                            <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                              <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                              <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            </svg>
                          </button>
                          <ul
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            className={`${isDropdownOpen === index ? '' : 'hidden'} absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                          >
                            <li>
                              <button
                                onClick={() => handleOptionSelect('CInspect', x.Id)}
                                className="block px-4 py-2 bg-gray-300 hover:bg-gray-500  hover:text-white w-full text-left"> Inspect</button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleOptionSelect('Clogs', x.Id)}
                                className="block px-4 py-2 bg-gray-300  hover:bg-gray-500 hover:text-white w-full text-left" > logs
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div> */}

                      <div className='flex justify-center items-center'>
                        <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                        </svg>

                        <div className='ml-3 py-2'>
                          <label className='text-white text-md font-semibold  overflow-hidden w-32'>{x.RepoTags && x.RepoTags[0] ? x.RepoTags[0].split(':')[0] : 'nginx2'}</label>
                          <p className='text-teal-400 text-sm w-32 truncate'>{x.RepoTags && x.RepoTags[0] ? x.RepoTags[0].split(':')[1] : 'latest'}</p>
                        </div>
                      </div>
                      <div className='flex justify-evenly mt-4 px-8 items-center w-full'>
                        <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                          onClick={() => setRunPopupVisible({ isopen: true, id: x.Id, name: x.RepoTags && x.RepoTags[0] ? x.RepoTags[0].split(':')[0] : 'nginx2' })}
                        >Create Container</button>


                        <svg
                          onClick={() => DeleteImageHandler(x.Id)}
                          // onClick={() => DeleteContainerHandler(x.Id)}
                          className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M30.5642 15.25C30.5642 23.3134 24.0275 29.85 15.9642 29.85C7.90081 29.85 1.36417 23.3134 1.36417 15.25C1.36417 7.18664 7.90081 0.65 15.9642 0.65C24.0275 0.65 30.5642 7.18664 30.5642 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.933 21.8829C12.0995 21.8829 11.4175 21.2199 11.4175 20.4095V13.0423C11.4175 12.2319 12.0995 11.5689 12.933 11.5689H18.9951C19.8287 11.5689 20.5107 12.2319 20.5107 13.0423V20.4095C20.5107 21.2199 19.8287 21.8829 18.9951 21.8829H12.933ZM18.0782 8.17263L18.6162 8.6957H20.5107C20.9274 8.6957 21.2684 9.02722 21.2684 9.43241C21.2684 9.83761 20.9274 10.1691 20.5107 10.1691H11.4175C11.0007 10.1691 10.6597 9.83761 10.6597 9.43241C10.6597 9.02722 11.0007 8.6957 11.4175 8.6957H13.3119L13.8499 8.17263C13.9863 8.04002 14.1833 7.95898 14.3803 7.95898H17.5478C17.7448 7.95898 17.9418 8.04002 18.0782 8.17263ZM18.6161 13.262C18.2499 13.262 17.9531 13.5588 17.9531 13.925V19.8924C17.9531 20.2586 18.2499 20.5554 18.6161 20.5554C18.9823 20.5554 19.2792 20.2586 19.2792 19.8924V13.925C19.2792 13.5588 18.9823 13.262 18.6161 13.262Z" fill="#C89125" />
                        </svg>

                      </div>
                    </div>

                    {/*Run popup */}
                    {runPopupVisible.isopen && (
                      <div id={x.Id} className="popup w-2/6 ">
                        <>
                          <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                          </svg>

                          <div className='ml-3 py-2'>
                            <label className='text-white text-md font-semibold'>Run new Container</label>
                            {/* <p className='text-teal-400 text-sm'> alpine/git</p>   */}
                          </div>
                        </>
                        <div className=' '>
                          <button onClick={() => setOptionalData(!optionalData)} className="w-full mb-2 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded  justify-between flex items-center">
                            <span className='mr-3'>Optional Data</span>
                            {optionalData ?
                              <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6.5L9 1L1 6.5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                              </svg>
                              :
                              <svg width="19" height="8" viewBox="0 0 19 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L10 6.5L18 1" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                              </svg>
                            }

                          </button>
                          {optionalData ?
                            <div className='overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 h-80'>
                              <input name="name" onChange={(e) => setImgName(e.target.value)} type='text' placeholder='Container Name' className={'bg-white-600 text-gray-200 w-full mb-3 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />

                              {/* <p className='text-gray-300  items-center  text-sm/[5px] mb-3'>A random name is generated if you do not provide one</p> */}
                              <p className='text-gray-300  items-center font-bold'>Ports</p>

                              <div className='w-full flex justify-center items-center '>
                                <input onChange={(e) => setHost(e.target.value)} type='text' placeholder="local Host e.g 80" className={'bg-white-600 text-gray-200 mr-2 w-3/6  shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                                <input onChange={(e) => setContainer(e.target.value)} type='text' placeholder="Container Path e.g 1723/tcp" className={'bg-white-600 text-gray-200 w-3/6 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />

                              </div>




                              <select
                                name="network"
                                className="bg-white-600 my-2 text-gray-800 w-full shadow border rounded p-1 text-sm focus:border-teal-500 focus:outline-none"
                                value={createImgVolumes}
                                onChange={(e) => setCreateImgVolumes(e.target.value)}
                              >
                                <option className='text-gray-500'>~Select Volumes~</option>
                                {VolumeList && VolumeList?.map((x, y) => (
                                  <option key={y} className="text-black-500" value={x.Name}>
                                    {x.Name}
                                  </option>
                                ))}
                              </select>



                              <p className='text-gray-300  font-semibold pb-1'>Envirnment Variables</p>
                              <div className='w-full flex justify-arround'>
                                <input onChange={(e) => setVariable(e.target.value)} type='text' placeholder="Variable" className={'bg-white-600 text-gray-200 mr-2 w-3/6  shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                                <input onChange={(e) => setValue(e.target.value)} type='text' placeholder="value" className={'bg-white-600 text-gray-200 w-3/6 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                                <button onClick={AddEnvirnomentHandler} className="p-1 text-white hover:bg-teal-400  ml-2 font-bold  rounded  justify-between flex items-center">
                                  <svg width="15" height="14" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="8.3291" y1="3.23891e-08" x2="8.3291" y2="16" stroke="white" stroke-width="1.5" />
                                    <line x1="16.8423" y1="8.3291" x2="0.000179291" y2="8.3291" stroke="white" stroke-width="1.5" />
                                  </svg>
                                </button>
                              </div>
                              {/* add map here  */}
                              {voluemShow &&
                                <> {envVariableData && envVariableData.map((x, y) => (
                                  <div className='bg-white-800 w-full shadow border rounded rounded p-1  border-teal-500 my-1'>
                                    <p type='text' placeholder="Container Path" className={' text-gray-300  text-sm '} >Variable: {x?.name}</p>
                                    <p type='text' placeholder="Container Path" className={' text-gray-300 text-sm  '} >Value: {x?.value}</p>
                                  </div>
                                ))}</>
                              }

                            </div> : ''}
                        </div>
                        <div className='flex justify-around ' style={{ alignSelf: 'center' }}>
                          <button
                            // onClick={() => RunContainerHandler(x.Id)} 
                            onClick={() => createHandler(x.Id, x.RepoTags && x.RepoTags[0] ? x.RepoTags[0].split(':')[0] : 'nginx2')}

                            className="mt-8 w-20 bg-teal-400  font-bold py-1 px-4 rounded  items-center">
                            Run
                          </button>
                          <button style={{ marginLeft: '5%' }} onClick={closeContainerbtn} className="mt-8 w-20 bg-gray-400  font-bold py-1 px-4 rounded  items-center">
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                ))}

              </div>
            }
          </div>
        }

        {/* Containers Section */}
        {activePopup === 'containers' &&
          < div className='w-full  h-screen  overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500   p-3 '>

            {/* Containers Section  logs/Inspects*/}
            {selectedOption === 'Clogs' || selectedOption === 'CInspect' || selectedOption === 'CStats' ? (
              <>
                {containerListInspect && containerListInspect?.map((x, y) => (
                  <div className='w-11/12 mt-5 m-auto'>
                    <div className='flex justify-center py-2 w-full justify-between mb-5'>
                      <div className='flex items-center'>
                        <svg onClick={() => setSelectedOption(false)} className='mr-5 cursor-pointer' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                        </svg>

                        <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                        </svg>

                        <label className='ml-3 text-white text-md font-semibold'>{x.Names}</label>
                      </div>
                      {/* <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                      </svg> */}

                    </div>

                    <label onClick={() => handleContainerInspectOptions('stats')} className='text-teal-400 text-md font-semibold border-b-teal-400 mb-5 mr-8'>Container Stats</label>
                    <label onClick={() => handleContainerInspectOptions('inspect')} className='text-teal-400 text-md font-semibold border-b-teal-400 mb-5 mr-8'>Inspect Container</label>
                    <label onClick={() => handleContainerInspectOptions('logs')} className='text-teal-400 text-md font-semibold border-b-teal-400 mb-5 '>Container Logs</label>

                    {(containerInspectOption === '1') ?
                      <>

                        {ContainerStats &&

                          <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                            <h2 className='cursor-pointer text-sbase font-bold w-52 text-gray-700 mb-5'>Container Stats</h2>

                            <div className=' text-left p-1  mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Used Memory</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{ContainerStats.memory_stats.usage}</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Available Memory</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{ContainerStats.memory_stats.limit}</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Memory usage %</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{((ContainerStats.memory_stats.usage) / (ContainerStats.memory_stats.limit) * 100)}</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>cpu_delta</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{ContainerStats.cpu_stats.cpu_usage.total_usage - ContainerStats.precpu_stats.cpu_usage.total_usage}</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>system_cpu_delta</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{ContainerStats.cpu_stats.system_cpu_usage - ContainerStats.precpu_stats.system_cpu_usage}</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>number_cpus</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{ContainerStats.cpu_stats.online_cpus}</p>
                            </div>
                            <div className=' text-left p-1 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                              <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>CPU usage %</p>
                              <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{ContainerStats.memory_stats.limit}</p>
                            </div>


                          </div>
                        }
                      </>
                      :
                      (containerInspectOption === '2') ?

                        <>

                          {containerInspect &&
                            < div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                              <h2 className='cursor-pointer text-sbase font-bold w-52 text-gray-700 mb-5'>Container Inspect</h2>
                              <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                                <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>ENV</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Config.Env[0]}</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Config.Env[1]}</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Config.Env[2]}</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Config.Env[3]}</p>
                              </div>
                              
                              <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                                <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Exposed Ports</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{JSON.stringify(containerInspect.Config.ExposedPorts, null, 2)}</p>
                              </div>

                              <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                                <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Created</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Created}</p>
                              </div>

                              <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                                <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Driver</p>
                                <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{containerInspect.Driver}</p>
                              </div>

                            </div>
                          }
                        </>
                        :
                        (containerInspectOption === '3') ?

                          <>

                            {ContainerLogs ?
                              < div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                                <h2 className='cursor-pointer text-sbase font-bold w-52 text-gray-700 mb-5'>Container Logs</h2>
                                <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                                  <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Logs:</p>
                                  <p style={preStyle} className='cursor-pointer text-sbase  text-gray-700 flex items-center ml-5'>{JSON.stringify(ContainerLogs, null, 2)}</p>
                                </div>

                              </div>
                              :
                              <p className='cursor-pointer text-sbase font-bold w-100 text-gray-100 mt-6'>Container Logs Not Found</p>
                            }
                          </>
                          : ''
                    }
                  </div>
                ))}
              </>
            )
              :
              <>
                <div className='flex  w-full  p-2'>
                  <button onClick={() => { AllcontainerHandler() }} className='bg-gray-300 hover:bg-gray-200 p-2 h-10'>All Containers</button>
                  <button onClick={() => { containerHandler("run") }} className='bg-gray-300 hover:bg-gray-200 mx-2 p-2 h-10'>Running Containers</button>
                  <button onClick={() => { containerHandler("stop") }} className='bg-gray-300 hover:bg-gray-200 p-2 h-10'>Stopped Containers</button>
                  <button onClick={() => { containerDelHandler("Delstop") }} className='bg-teal-400 hover:bg-gray-200 p-2 h-10 ml-2'>Delete Stopped Containers</button>

                </div>
                <h2 className=" font-bold mt-2 text-teal-300 border-b-[2px] psx-2  border-b-teal-200 w-full ">Containers Mapping</h2>
                <div className='flex flex-wrap justify-evenly'>{containerData && containerData?.map((x, index) => (
                  <>
                    {connectpopup ?
                      <div className=" popup  w-4/12 items-center ">
                        {/* <div className='w-full bg-black opacity-50 fixed'></div> */}
                        <div className='flex flex-col items-center w-4/6'>
                          <label className=' text-teal-400 text-2xl font-medium my-3 w-52' > Connect Container</label>
                          <label className='text-white  items-center my-4' >Press connect to establish the connection between a container and network</label>
                          {/*  */}
                          <div className='flex w-full justify-center items-center  mb-3'>
                            <select
                              name="network"
                              className="bg-white-600 text-gray-800 w-5/6 shadow border rounded p-1 text-sm focus:border-teal-500 focus:outline-none"
                              value={selectedNetwork}
                              onChange={handleSelectChange}
                            >
                              <option className='text-gray-500'>~Select Network~</option>
                              {Networklist && Networklist.map((x, y) => (
                                <option key={y} className="text-black-500" value={x.Name}>
                                  {x.Name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='flex justify-center py-3'>
                            <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                              onClick={handleConnectContainer}>Connect</button>
                            <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                              // onClick={setConnectpopup(false)}
                              onClick={handleConnectclose} >Cancel</button>
                          </div>
                        </div>
                      </div>
                      : ""
                    }
                    {disConnectpopup ?
                      <div className=" popup  w-4/12 items-center ">
                        {/* <div className='w-full bg-black opacity-50 fixed'></div> */}
                        <div className='flex flex-col items-center w-4/6'>
                          <label className=' text-teal-400 text-2xl font-medium my-3  ' > Disconnect Container</label>
                          <label className='text-white  items-center my-4' >Press Disconnect to terminate the connection between the container and network</label>
                          {/*  */}
                          <div className='flex w-full justify-center items-center  mb-3'>
                            <select
                              name="network"
                              className="bg-white-600 text-gray-800 w-5/6 shadow border rounded p-1 text-sm focus:border-teal-500 focus:outline-none"
                              value={selectedNetwork}
                              onChange={handleSelectChange}
                            >
                              <option className='text-gray-500'>~Select Network~</option>
                              {Networklist && Networklist.map((x, y) => (
                                <option key={y} className="text-black-500" value={x.Name}>
                                  {x.Name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className='flex justify-center py-3'>
                            <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                              onClick={handleDisConnectContainer}>Disconnect</button>
                            <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                              // onClick={setConnectpopup(false)}
                              onClick={handleConnectclose} >Cancel</button>
                          </div>
                        </div>
                      </div>
                      : ""
                    }
                    <div key={x.Id} className="p-2 m-1 card-bg-color  flex flex-col justify-center" >
                      <div className='flex justify-between items-center mx-3'>
                        <label className='text-teal-400 text-right text-sm pr-4'> {x.State}</label>
                        <div className="inline-block relative">
                          <button onClick={() => setIsDropdownOpen(index)} type="button" >
                            <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                              <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                              <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            </svg>
                          </button>
                          <ul onMouseLeave={() => setIsDropdownOpen(false)}
                            className={`${isDropdownOpen === index ? '' : 'hidden'} absolute right-0 z-10 mt-2 bg-white divide-x divide-gray-100 rounded-lg shadow`}
                          >
                            <li>
                              <button
                                onClick={() => handleOptionSelect('CStats', x.Id)}
                                className="block px-4 py-2 bg-gray-300 hover:bg-gray-500  hover:text-white w-full text-left" > Stats</button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleOptionSelect('CInspect', x.Id)}
                                className="block px-4 py-2 bg-gray-300 hover:bg-gray-500   hover:text-white w-full text-left" > Inspect</button>
                            </li>
                            <li>
                              <button
                                onClick={() => handleOptionSelect('Clogs', x.Id)}
                                className="block px-4 py-2 bg-gray-300  hover:bg-gray-500  hover:text-white w-full text-left" > Logs
                              </button>
                            </li>

                            <li>
                              <button
                                onClick={() => popupConnectHandler(x.Id)}
                                className="block px-4 py-2 bg-gray-300  hover:bg-gray-500 hover:text-white w-full text-left" > Connect
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => popupDixconnectHandler(x.Id)}
                                // onClick={() => handleDisConnectContainer(x.Id)}
                                className="block px-4 py-2 bg-gray-300  hover:bg-gray-500  hover:text-white w-full text-left" > Disconnect
                              </button>
                            </li>

                          </ul>
                        </div>
                      </div>
                      <div className='flex justify-center items-center'>
                        <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                        </svg>

                        <div className='ml-3 py-2'>
                          <label className='text-white text-md font-semibold'>{x.Names}</label>
                          <p className='text-teal-400 text-sm w-32 truncate overflow-hidden'> {x.Command} </p>
                        </div>
                      </div>
                      <div className='flex justify-evenly px-8 items-center w-full'>
                        <svg onClick={() => StartContainerHandler(x.Id)} className="cursor-pointer" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.2154 18.9045C9.99558 19.0443 9.80607 19.0443 9.64688 18.9045C9.49527 18.7519 9.38915 18.5359 9.3285 18.2563C9.26786 17.9639 9.26786 17.6779 9.3285 17.3983C9.38915 17.106 9.52559 16.8899 9.73785 16.7501L13.2514 14.4814L9.73785 12.2317C9.52559 12.0919 9.38915 11.8758 9.3285 11.5835C9.26786 11.2911 9.26786 11.0051 9.3285 10.7255C9.38915 10.4332 9.49527 10.2108 9.64688 10.0582C9.80607 9.90572 9.99558 9.90572 10.2154 10.0582L14.4112 12.8227C14.8812 13.1277 15.4615 13.6933 15.4615 14.4814C15.4615 15.2948 14.8812 15.835 14.4112 16.14L10.2154 18.9045Z" fill="#C89125" />
                          <path d="M17.7 19.8895C17.5256 19.8895 17.3816 19.7942 17.2679 19.6035C17.1618 19.4256 17.1087 19.2032 17.1087 18.9362C17.1087 18.6566 17.1618 18.4215 17.2679 18.2308C17.3816 18.0529 17.5256 17.9639 17.7 17.9639H21.964C22.1308 17.9639 22.2672 18.0529 22.3733 18.2308C22.487 18.4215 22.5439 18.6566 22.5439 18.9362C22.5439 19.2032 22.487 19.4256 22.3733 19.6035C22.2672 19.7942 22.1308 19.8895 21.964 19.8895H17.7Z" fill="#C89125" />
                          <path d="M29.85 15.25C29.85 23.3134 23.3134 29.85 15.25 29.85C7.18664 29.85 0.65 23.3134 0.65 15.25C0.65 7.18664 7.18664 0.65 15.25 0.65C23.3134 0.65 29.85 7.18664 29.85 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                        </svg>
                        <svg onClick={() => StopContainerHandler(x.Id)} className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M30.421 15.25C30.421 23.3134 23.8844 29.85 15.821 29.85C7.75769 29.85 1.22104 23.3134 1.22104 15.25C1.22104 7.18664 7.75769 0.65 15.821 0.65C23.8844 0.65 30.421 7.18664 30.421 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                          <rect x="11.1806" y="10.6108" width="9.28261" height="9.28261" fill="#C89125" />
                        </svg>
                        <svg onClick={() => RestartContainerHandler(x.Id)} className="cursor-pointer" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.9923 15.25C29.9923 23.3134 23.4556 29.85 15.3923 29.85C7.32891 29.85 0.792273 23.3134 0.792273 15.25C0.792273 7.18664 7.32891 0.65 15.3923 0.65C23.4556 0.65 29.9923 7.18664 29.9923 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                          <path d="M15.3922 9.29061C13.8621 9.29109 12.3371 9.86667 11.1707 11.0331C8.83796 13.3658 8.84206 17.1383 11.1734 19.4696C13.5047 21.8009 17.2771 21.805 19.6099 19.4722C21.5785 17.5036 21.8749 14.5172 20.5249 12.2278L19.4272 13.3256C20.2233 14.9873 19.9325 17.0398 18.555 18.4173C16.8081 20.1643 13.9695 20.1652 12.2237 18.4193C10.4778 16.6735 10.4787 13.8349 12.2256 12.088C13.1017 11.2118 14.2468 10.7947 15.3917 10.7996L15.3907 14.1974L19.0851 10.503L15.393 6.81083L15.3922 9.29061Z" fill="#C89125" />
                        </svg>
                        <svg onClick={() => DeleteContainerHandler(x.Id)} className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M30.5642 15.25C30.5642 23.3134 24.0275 29.85 15.9642 29.85C7.90081 29.85 1.36417 23.3134 1.36417 15.25C1.36417 7.18664 7.90081 0.65 15.9642 0.65C24.0275 0.65 30.5642 7.18664 30.5642 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M12.933 21.8829C12.0995 21.8829 11.4175 21.2199 11.4175 20.4095V13.0423C11.4175 12.2319 12.0995 11.5689 12.933 11.5689H18.9951C19.8287 11.5689 20.5107 12.2319 20.5107 13.0423V20.4095C20.5107 21.2199 19.8287 21.8829 18.9951 21.8829H12.933ZM18.0782 8.17263L18.6162 8.6957H20.5107C20.9274 8.6957 21.2684 9.02722 21.2684 9.43241C21.2684 9.83761 20.9274 10.1691 20.5107 10.1691H11.4175C11.0007 10.1691 10.6597 9.83761 10.6597 9.43241C10.6597 9.02722 11.0007 8.6957 11.4175 8.6957H13.3119L13.8499 8.17263C13.9863 8.04002 14.1833 7.95898 14.3803 7.95898H17.5478C17.7448 7.95898 17.9418 8.04002 18.0782 8.17263ZM18.6161 13.262C18.2499 13.262 17.9531 13.5588 17.9531 13.925V19.8924C17.9531 20.2586 18.2499 20.5554 18.6161 20.5554C18.9823 20.5554 19.2792 20.2586 19.2792 19.8924V13.925C19.2792 13.5588 18.9823 13.262 18.6161 13.262Z" fill="#C89125" />
                        </svg>

                      </div>
                      {/* <div className='flex justify-center my-2'>
                        <button className="text-sm mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-0.5 px-2 rounded items-center"
                          onClick={() => popupConnectHandler(x.Id)}  >Connect Container</button>
                        <button className="text-sm bg-teal-400 hover:bg-teal-300 font-semibold py-0.5 px-2 rounded items-center"
                          onClick={convertHandler}  >Disconnect Container</button>
                      </div> */}


                    </div>
                  </>
                ))}
                </div>
              </>}
          </div>
        }


        {/* IMport Image section*/}
        {activePopup === 'importImgPopup' &&
          < div className='w-full  overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500'>


            <div className=" flex flex-col justify-between items-center  w-full  pt-6 pointer-events">
              <div className="relative w-10/12 flex justify-between ">
                <svg className=" absolute w-4 h-4 inset-y-0 left-2 mt-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>

                <input
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  type="text"
                  className="block w-11/12 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 focus:border-blue-500"
                  placeholder="search..." />
                <button
                  onClick={handleSearch}


                  type="button" className="text-white  right-2.5 bottom-2.5 bg-teal-400  hover:bg-teal-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-teal-400  dark:focus:ring-blue-800">Search</button>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center '>
              {importImg && importImg?.map((x, y) => (
                <>
                  {/* 
                  {popupPullimg &&
                    <div key={y} className=" popup  w-4/12 items-center ">

                      <div className='flex flex-col items-center'>
                        <label className=' text-teal-400 text-2xl font-medium my-2' > Pull Image</label>
                        <label className='text-white  items-center my-4' >Press confirm to exescute</label>
                        <button className=" mr-4 bg-teal-400 hover:bg-teal-300 font-semibold py-1 px-4 rounded items-center"
                          onClick={PullImage(x.name)}
                        >Conform</button>


                      </div>

                    </div>
                  } */}
                  <div key={"card_" + x.Id} style={{ backgroundColor: '#17222A' }} className="flex w-11/12 items-center justify-between p-2 my-4 pointer-events">
                    <div className='flex justify-center items-center'>
                      <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                      </svg>
                      <div className='ml-3 py-2'>
                        <label className='text-white text-md font-semibold'>{x.name}</label>
                        {x.is_official ? <i className='pl-3 text-teal-400 text-sm'>Official Image</i> : <i className='pl-3 text-teal-400 text-sm'>Unofficial Image</i>}
                        <p className='text-gray-400 text-sm font-normal'>  {x.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => ImportImageHandler(x.name)}
                      type="button" className="text-white  right-2.5 bottom-2.5 current-pointer  hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-gray-400  dark:focus:ring-gray-700">
                      Import Image</button>
                  </div>
                </>
              ))}
            </div>
          </div>
        }
        {/* Network Section Start*/}
        {activePopup === 'networkPopup' && (
          <div className='w-10/12 mt-5'>

            {popupCardNetwork &&
              <div style={{ width: '300px' }} id='pop1' className="p-2 absolute  popup-main  shadow rounded overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 ">
                <div className='flex justify-between mb-2'>
                  <button onClick={() => { unusedhandler('network') }} className='bg-gray-300 rounded hover:bg-gray-200 px-2 w-9/12 '>Remove Unused Networks</button>
                  <button onClick={() => { setPopupCardNetwork(false) }} className='bg-gray-300 px-2 rounded'>X</button>
                </div>
                {/* Apply map loop here for hetwork cards "Start" */}
                {Networklist && Networklist?.map((x, index) => (

                  <div key={index} className=" flex bg-gray-700 p-4 items-center justify-between" id='0'
                  // onDragStart={(e) => handleDragStart(e, '0')}
                  >
                    <div className='flex justify-center ml-3 py-2'>
                      <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                      </svg>
                      <label className='ml-3 text-white text-md font-semibold w-32 overflow-hidden'> {x.Name}</label>
                    </div>
                    {/* {x.Id} */}
                    <div className="relative inline-block text-left">
                      <div className="inline-block relative">
                        <button
                          // onClick={() => toggleDropdown(index)}
                          onClick={() => setIsDropdownOpen(index)}
                          type="button"
                        >

                          <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          </svg>
                        </button>
                        <ul onMouseLeave={() => setIsDropdownOpen(false)}
                          className={`${isDropdownOpen === index ? '' : 'hidden'
                            } absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                        >
                          <li>
                            <button
                              onClick={() => handleOptionSelect('Inspect', x.Id)}
                              className="block px-4 py-2 bg-gray-300 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleOptionSelect('Delete', x.Id)}
                              className="block px-4 py-2 bg-gray-300  hover:bg-gray-500 hover:text-white w-full text-left" > Remove Network
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                {/* End */}

              </div>
            }
            {/* Inspect section */}
            {inspectPopup && selectedOption === 'Inspect' &&
              <>
                {networklist && networklist.map((x, y) => (
                  < div key={y} >
                    <div className='flex justify-center py-2 w-full justify-between'>
                      <div className='flex items-center'>
                        <svg onClick={() => setSelectedOption(false)} className='mr-5' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                        </svg>

                        <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                        </svg>

                        <label className='ml-3 text-white text-md font-semibold'> {x.Name}</label>
                      </div>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                      </svg>

                    </div>
                    <label className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3'>Inspect </label>
                    {networkINspect &&
                      <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                        <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                          <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Name</p>
                          <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Name}</p>
                        </div>
                        <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                          <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>ID</p>
                          <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Id}</p>
                        </div>
                        <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                          <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Driver</p>
                          <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Driver}</p>
                        </div>
                        <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                          <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Containers</p>
                          <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Container}</p>
                        </div>

                      </div>}
                  </div >

                ))}
              </>
            }
          </div>
        )
        }

        {/* ------ */}
        {activePopup === 'listofvolume' && (
          <div className='w-10/12 mt-5'>

            {popupvolumList &&
              <div style={{ width: '300px' }} id='pop1' className="p-2 absolute  popup-main  shadow rounded overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 ">
                <div className='flex justify-between mb-2'>
                  <button onClick={() => { unusedhandler('volume') }} className='bg-gray-300 rounded hover:bg-gray-200 px-2 w-9/12 '>Remove Unused Volumes</button>
                  <button onClick={() => { setPopupvolumList(false) }} className='bg-gray-300 px-2 rounded'>X</button>
                </div>
                {/* Apply map loop here for hetwork cards "Start" */}
                {VolumeList && VolumeList?.map((x, index) => (
                  <div key={index} className=" flex bg-gray-700 p-4 items-center justify-between " id='0'

                  // onDragStart={(e) => handleDragStart(e, '0')}
                  >
                    <div className='flex justify-center ml-3 py-2'>
                      <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                      </svg>
                      <label className='ml-3 text-white text-md font-semibold overflow-hidden w-32'> {x.Name}</label>
                    </div>
                    {/* {x.Id} */}
                    <div className="relative inline-block text-left">
                      <div className="inline-block relative">
                        <button
                          // onClick={() => toggleDropdown(index)}
                          onClick={() => setIsDropdownOpen(index)}
                          type="button"
                        >

                          <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          </svg>
                        </button>
                        <ul onMouseLeave={() => setIsDropdownOpen(false)}
                          className={`${isDropdownOpen === index ? '' : 'hidden'
                            } absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                        >
                          <li>
                            <button
                              onClick={() => handleOptionSelect('vInspect', x.Name)}
                              className="block px-4 py-2 bg-gray-300 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleOptionSelect('VDelete', x.Name)}
                              className="block px-4 py-2 bg-gray-300  hover:bg-gray-500 hover:text-white w-full text-left" > Remove volume
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                {/* End */}

              </div>
            }
            {/* Inspect section */}


            {VolumeList && selectedOption === 'vInspect' &&
              <>
                {volumInspect && volumInspect?.map((x, y) => (
                  < div key={y} >
                    <div className='flex justify-center py-2 w-full justify-between'>
                      <div className='flex items-center'>
                        <svg onClick={() => setSelectedOption(false)} className='mr-5' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                        </svg>

                        <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                        </svg>

                        <label className='ml-3 text-white text-md font-semibold'> {x.Name}</label>
                      </div>
                      <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                      </svg>

                    </div>
                    <label className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3'>Inspect</label>
                    <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                      <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                        <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Name</p>
                        <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Name}</p>
                      </div>
                      <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                        <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Scope</p>
                        <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Scope}</p>
                      </div>
                      <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                        <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Mountpoint</p>
                        <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.Mountpoint}</p>
                      </div>
                      <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                        <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>CreatedAt</p>
                        <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>{x.CreatedAt}</p>
                      </div>

                      {/* <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                        <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>pkg_VERSION</p>
                        <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1~bookworm</p>
                      </div> */}
                      {/* <h2 className=" font-bold mt-2">Port</h2> */}

                      {/* <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                        <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>80/tcp</p>
                        <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.0.0.0.:50005</p>
                      </div> */}
                    </div>
                  </div >

                ))}
              </>
            }
          </div>
        )
        }
        {/* --- */}
        {!activePopup &&
          < p className='text-gray-700 text-6xl font-bold pt-16'>Welcome to Dockur</p>
        }


      </div >
    </div >

  )
}

const mapStateToProps = (state) => ({
  Networklist: state.authReducer.Networklist,
  containerLists: state.authReducer.containerLists,



  // call state here from recuder and in props Line (10)
})

const mapDispatchToProps = { geNetworkData, CreateNetwork, AddVolume, ImportImage, ListofImages, CreateImage, DeleteVolume, RemoveUnusedVolume, ApiCall_POST, ApiCall_GET }//  Api Call funtion form Action also imort function from actions & also call in props Line(10) && 

export default connect(mapStateToProps, mapDispatchToProps)(Home)