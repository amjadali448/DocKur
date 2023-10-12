import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'
import JsonData from '../jsondata.json'
import { getDockerData } from '../Redux/Auth/action'//APi Redux function import
import "./header.css";
import axios from 'axios';

export const Home = ({ getDockerData }, props) => {

  const [popupVisible, setPopupVisible] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [hostshow, setHostShow] = useState(false)
  const [voluemShow, setVoluemShow] = useState(false)
  const [popupCardNetwork, setPopupCardNetwork] = useState(true)
  const [logsInsSwitch, setLogsInsSwitch] = useState(false)

  const handlePopupChange = (popupName) => {
    console.log("popupName", popupName);
    if (activePopup === 'listImgPopup') {
      setPopupCard(true)
    }
    if (activePopup === 'networkPopup') {
      setPopupCardNetwork(true)
    }
    setActivePopup(popupName);
  };


  // UPload Folder
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderChange = (event) => {
    const folder = event.target.files[0];
    console.log("folder", folder);
    if (folder && folder.webkitRelativePath) {
      const folderPath = folder.webkitRelativePath.split('/')[0];
      setSelectedFolder(folderPath);
    }
  };

  // LIst of Images  ----------------------
  const [runPopupVisible, setRunPopupVisible] = useState({ isopen: false, id: "" });
  const [popupCard, setPopupCard] = useState(true);
  const [draggedCards, setDraggedCards] = useState([]);
  const [running, setRunning] = useState('NOT RUNNING')
  const [optionalData, setOptionalData] = useState(false)

  // drag and drop
  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const cardText = e.dataTransfer.getData('text/plain');//0,1,2,3,4
    // console.log(draggedCards, 'draggedCards');

    if (draggedCards.length <= 11 && draggedCards.filter(x => x === cardText).length === 0) {
      setDraggedCards([...draggedCards, cardText]);
      setPopupVisible(true);
    }
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleDragStart = (e, id) => {
    // console.log(id, 'id--31');
    e.dataTransfer.setData('text/plain', id);//0,1,2,3
  };

  // Add api here for run list of images 
  const RunHandler = () => {
    setRunning(runPopupVisible.id)
    setRunPopupVisible({ isopen: false, id: "" })


  }
  
  const pushtoHub = () => {
//  Call api here


  }

  // List of Images cards desigs {create image}
  const PopUpMenu = (key, card) => {
    return (
      <div className=" h-4/6 w-4/6 m-1 card-bg-color  flex flex-col justify-center" id={"card_" + key}>
        {/* <label className='text-teal-400 text-right text-sm pr-4'> {running === "card_" + key ? 'Running' : 'Not Running'} </label> */}

        <div className='flex justify-between items-center mx-3'>
          <label className='text-teal-400 text-right text-sm pr-4'> {running === "card_" + key ? 'Running' : 'Not Running'} </label>
          <div className="inline-block relative">
            <button onClick={() => toggleDropdown(key)} type="button" >
              <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
              </svg>
            </button>
            <ul
              onMouseLeave={() => setIsDropdownOpen(false)}
              className={`${isDropdownOpen === key ? '' : 'hidden'} absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
            >
              <li>
                <button
                  onClick={() => handlecontainer('Inspect')}
                  className="block px-4 py-2 bg-gray-600 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect  </button>
              </li>
              <li>
                <button
                  onClick={() => handlecontainer('logs')}
                  className="block px-4 py-2 bg-gray-600  hover:bg-gray-500 hover:text-white w-full text-left" > logs
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
            <label className='text-white text-md font-semibold'>alpine</label>
            <p className='text-teal-400 text-sm'> alpine/git</p>
          </div>
        </div>
        <div className='flex justify-evenly px-8 items-center w-full'>
          <svg onClick={() => setRunPopupVisible({ isopen: true, id: "card_" + key })} className="cursor-pointer" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2154 18.9045C9.99558 19.0443 9.80607 19.0443 9.64688 18.9045C9.49527 18.7519 9.38915 18.5359 9.3285 18.2563C9.26786 17.9639 9.26786 17.6779 9.3285 17.3983C9.38915 17.106 9.52559 16.8899 9.73785 16.7501L13.2514 14.4814L9.73785 12.2317C9.52559 12.0919 9.38915 11.8758 9.3285 11.5835C9.26786 11.2911 9.26786 11.0051 9.3285 10.7255C9.38915 10.4332 9.49527 10.2108 9.64688 10.0582C9.80607 9.90572 9.99558 9.90572 10.2154 10.0582L14.4112 12.8227C14.8812 13.1277 15.4615 13.6933 15.4615 14.4814C15.4615 15.2948 14.8812 15.835 14.4112 16.14L10.2154 18.9045Z" fill="#C89125" />
            <path d="M17.7 19.8895C17.5256 19.8895 17.3816 19.7942 17.2679 19.6035C17.1618 19.4256 17.1087 19.2032 17.1087 18.9362C17.1087 18.6566 17.1618 18.4215 17.2679 18.2308C17.3816 18.0529 17.5256 17.9639 17.7 17.9639H21.964C22.1308 17.9639 22.2672 18.0529 22.3733 18.2308C22.487 18.4215 22.5439 18.6566 22.5439 18.9362C22.5439 19.2032 22.487 19.4256 22.3733 19.6035C22.2672 19.7942 22.1308 19.8895 21.964 19.8895H17.7Z" fill="#C89125" />
            <path d="M29.85 15.25C29.85 23.3134 23.3134 29.85 15.25 29.85C7.18664 29.85 0.65 23.3134 0.65 15.25C0.65 7.18664 7.18664 0.65 15.25 0.65C23.3134 0.65 29.85 7.18664 29.85 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
          </svg>
          <svg onClick={() => setRunning('NOT RUNNING')} className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.421 15.25C30.421 23.3134 23.8844 29.85 15.821 29.85C7.75769 29.85 1.22104 23.3134 1.22104 15.25C1.22104 7.18664 7.75769 0.65 15.821 0.65C23.8844 0.65 30.421 7.18664 30.421 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
            <rect x="11.1806" y="10.6108" width="9.28261" height="9.28261" fill="#C89125" />
          </svg>
          <svg className="cursor-pointer" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.9923 15.25C29.9923 23.3134 23.4556 29.85 15.3923 29.85C7.32891 29.85 0.792273 23.3134 0.792273 15.25C0.792273 7.18664 7.32891 0.65 15.3923 0.65C23.4556 0.65 29.9923 7.18664 29.9923 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
            <path d="M15.3922 9.29061C13.8621 9.29109 12.3371 9.86667 11.1707 11.0331C8.83796 13.3658 8.84206 17.1383 11.1734 19.4696C13.5047 21.8009 17.2771 21.805 19.6099 19.4722C21.5785 17.5036 21.8749 14.5172 20.5249 12.2278L19.4272 13.3256C20.2233 14.9873 19.9325 17.0398 18.555 18.4173C16.8081 20.1643 13.9695 20.1652 12.2237 18.4193C10.4778 16.6735 10.4787 13.8349 12.2256 12.088C13.1017 11.2118 14.2468 10.7947 15.3917 10.7996L15.3907 14.1974L19.0851 10.503L15.393 6.81083L15.3922 9.29061Z" fill="#C89125" />
          </svg>
          <svg className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.5642 15.25C30.5642 23.3134 24.0275 29.85 15.9642 29.85C7.90081 29.85 1.36417 23.3134 1.36417 15.25C1.36417 7.18664 7.90081 0.65 15.9642 0.65C24.0275 0.65 30.5642 7.18664 30.5642 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.933 21.8829C12.0995 21.8829 11.4175 21.2199 11.4175 20.4095V13.0423C11.4175 12.2319 12.0995 11.5689 12.933 11.5689H18.9951C19.8287 11.5689 20.5107 12.2319 20.5107 13.0423V20.4095C20.5107 21.2199 19.8287 21.8829 18.9951 21.8829H12.933ZM18.0782 8.17263L18.6162 8.6957H20.5107C20.9274 8.6957 21.2684 9.02722 21.2684 9.43241C21.2684 9.83761 20.9274 10.1691 20.5107 10.1691H11.4175C11.0007 10.1691 10.6597 9.83761 10.6597 9.43241C10.6597 9.02722 11.0007 8.6957 11.4175 8.6957H13.3119L13.8499 8.17263C13.9863 8.04002 14.1833 7.95898 14.3803 7.95898H17.5478C17.7448 7.95898 17.9418 8.04002 18.0782 8.17263ZM18.6161 13.262C18.2499 13.262 17.9531 13.5588 17.9531 13.925V19.8924C17.9531 20.2586 18.2499 20.5554 18.6161 20.5554C18.9823 20.5554 19.2792 20.2586 19.2792 19.8924V13.925C19.2792 13.5588 18.9823 13.262 18.6161 13.262Z" fill="#C89125" />
          </svg>

        </div>
      </div>
    );
  }

  // test api calls  =======================
  useEffect(() => {
    // setData(JsosData)
    // const apiUrl = 'https://api.example.com/data';
    const apiUrl = 'http://127.0.0.1:2375/container-list';
    axios.get(apiUrl)
      .then((response) => {
        // Handle the successful response here
        console.log('Response Data:', response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Request Error:', error);
      });
    // getDockerData()

  }, [])
  // ==================

  const [filteredData, setFilteredData] = useState(JsonData); // Initialize with your full data
  // const specificNameToSearch = 'Specific Name'; // Replace with the specific name you want to search for

  const handleSearch = (query) => {

    const filtered = JsonData.filter((item) =>
      // Use a regular expression to match names containing the query (case-insensitive)
      new RegExp(query, 'i').test(item.name)
    );
    // Sort the filtered data based on the 'name' property in ascending order
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(filtered);
  };

  // list of network
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inspectPopup, setInspectPopup] = useState(false);

  // Network Inspect
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

    if (option === 'Inspect') {
      setInspectPopup(true);
    }
  };

  // Containers logs/inspect
  const handlecontainer = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false)

  };

  const toggleDropdown = (id) => {
    setIsDropdownOpen(id);
  };

  // create network Popup
  const [networkname, setnetworkname] = useState('');
  const [networksPopup, setNetworksPopup] = useState(false);

  const NetworkPopupOpen = (popupCardNetwork) => {
    console.log("popupName", popupCardNetwork);
    if (activePopup === 'networkPopup') {
      setPopupCardNetwork(true)
    }
    setActivePopup(popupCardNetwork);
  };

  return (

    <div style={{ height: '92%', backgroundColor: '#475E6E' }} className='flex height '>
      {/* <Sidebar /> */}
      <div className="nav relative  items-center flex flex-col h-full bg-teal-200">
        <p className='text-3xl my-2 text-teal-400'>Connect</p>
        <input type="text" className="text-white ip my-2 w-10/12 p-2 rounded-md border-b item-center" placeholder="192.168.0.0"></input>
        <button type="button" className=" font-semibold bg-teal-400  p-1 text-md w-10/12 rounded-md">Connect</button>


        {/* Tabs Section */}
        <button className="w-44 mt-3 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => handlePopupChange('Uploadpopup')}>
          <span className='mr-3'>Create Image</span>
        </button>
        <button
          onClick={() => handlePopupChange('listImgPopup')}
          className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
          <span className='mr-3'>List of Images</span>
          <svg className="fill-current w-4 h-4 mr-2 " viewBox="0 0 80 40">
            <rect width="60" height="10"></rect>
            <rect y="20" width="60" height="10"></rect>
            <rect y="40" width="60" height="10"></rect>
          </svg>
        </button>
        <button
          onClick={() => handlePopupChange('containers')}
          className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
          <span className='mr-3'>List of Containers</span>

        </button>

        <button
          onClick={() => handlePopupChange('importImgPopup')}
          className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
          <span className='mr-3'>Import Image</span>

        </button>
        <button className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
          <span className='mr-3'>Create Network</span>
        </button>
        <input
          onChange={(e) => setnetworkname(e.target.value)}
          type="text" className="text-white ip my-2 w-44 p-1 rounded-md item-center" placeholder="Network Name..." />
        <button type="button" className=" font-semibold bg-teal-400  p-1 text-md w-10/12 hover:bg-teal-300 rounded-md"
          onClick={() => setNetworksPopup(true)}
        >Create</button>
        <button
          onClick={() => handlePopupChange('networkPopup')}
          className=" text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
          {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
          <span className='mr-3'>List of Networks</span>
          <svg className="fill-current w-4 h-4 mr-2 " viewBox="0 0 80 40">
            <rect width="60" height="10"></rect>
            <rect y="20" width="60" height="10"></rect>
            <rect y="40" width="60" height="10"></rect>
          </svg>
        </button>



        {networksPopup ? (
          <div style={{ left: ' 249%' }} className=" popup h-52 w-80 items-center ">
            <label className='text-white text-center items-center'>Network Created Succesfully! </label>
            <button className="mt-8 w-40 bg-teal-400 hover:bg-teal-300 font-bold py-1 px-4 rounded  items-center" onClick={() => setNetworksPopup(false)}>
              ok
            </button>
          </div>
        ) : ''}
        {/* uplad image */}
        {/* {Uploadpopup ? (
          <div style={{ left: ' 249%' }} className=" popup h-52 w-80 items-center ">
            <label className='text-white text-center items-center'>Upload the file to convert it into an Image</label>
            <button className="mt-8 w-40 bg-teal-400 hover:bg-teal-300 font-bold py-1 px-4 rounded  items-center" onClick={() => setPopupVisible(false)}>
              Upload
            </button>
            <div>
              <input type="file" webkitdirectory="" onChange={handleFolderChange} />
              {selectedFolder && (
                <div>
                  <h4>Selected Folder Location:</h4>
                  <p>{selectedFolder}</p>
                  {selectedFolder}
                </div>
              )}
            </div>

          </div>
        ) : ''} */}
        {/* {networksPopup ? */}


        <div className="w-full absolute bottom-0 mt-12 bg-teal-400 flex justify-center p-2">
          {/* <img src={logo} className="bottom-img shadow self-center" alt="img" /> */}
        </div>
      </div>

      {/* Main component*/}
      <div className="App flex justify-items-center items-center flex-col w-full   " >

        {/* Network Section */}

        {activePopup === 'networkPopup' && (
          <div className='w-10/12 mt-5'>

            {popupCardNetwork &&
              <div style={{ width: '300px' }} id='pop1' className="p-2 absolute  popup-main  shadow rounded overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 ">
                <div className='flex justify-between mb-2'>

                  <button className='bg-gray-400 rounded hover:bg-gray-500 px-2 w-9/12 '>Remove Unused Networks</button>
                  {/* <button onClick={() => { setPopupCardNetwork(false) }} className='bg-gray-600 hover:bg-gray-500 p-1 rounded '>X </button> */}
                  <button onClick={() => { setPopupCardNetwork(false) }} className='bg-gray-400 px-2 rounded'>X</button>

                </div>
                {/* Add more cards as needed */}
                <div className=" flex bg-gray-700 p-4 items-center justify-between" id='0'
                // onDragStart={(e) => handleDragStart(e, '0')}
                >
                  <div className='flex justify-center ml-3 py-2'>
                    <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>
                    <label className='ml-3 text-white text-md font-semibold'>Network Name</label>
                  </div>

                  <div className="relative inline-block text-left">
                    <div className="inline-block relative">
                      <button
                        onClick={() => toggleDropdown(1)}
                        type="button"
                      // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >

                        <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                        </svg>
                      </button>
                      <ul onMouseLeave={() => setIsDropdownOpen(false)}
                        className={`${isDropdownOpen === 1 ? '' : 'hidden'
                          } absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                      >
                        <li>
                          <button
                            onClick={() => handleOptionSelect('Inspect')}
                            className="block px-4 py-2 bg-gray-600 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleOptionSelect('Delete')}
                            className="block px-4 py-2 bg-gray-600  hover:bg-gray-500 hover:text-white w-full text-left" > Remove Network
                          </button>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
                <div className=" flex bg-gray-700 p-4 items-center justify-between" id='1'
                // onDragStart={(e) => handleDragStart(e, '0')}
                >
                  <div className='flex justify-center ml-3 py-2'>
                    <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>
                    <label className='ml-3 text-white text-md font-semibold'>Network Name</label>
                  </div>

                  <div className="relative inline-block text-left">
                    <div className="inline-block relative">
                      <button
                        onClick={() => toggleDropdown(2)}
                        type="button"
                        name={'option_2'}

                      // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >

                        <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                        </svg>
                      </button>
                      <ul
                        className={`${isDropdownOpen === 2 ? '' : 'hidden'
                          } absolute z-10 right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                      >
                        <li>
                          <button
                            onClick={() => handleOptionSelect('Inspect')}
                            className="block px-4 py-2 bg-gray-600 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect</button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleOptionSelect('Delete')}
                            className="block px-4 py-2 bg-gray-600  hover:bg-gray-500 hover:text-white w-full text-left" > Remove Network
                          </button>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
                <div className=" flex bg-gray-700 p-4 items-center justify-between" id='2'
                // onDragStart={(e) => handleDragStart(e, '0')}
                >
                  <div className='flex justify-center ml-3 py-2'>
                    <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>

                    <label className='ml-3 text-white text-md font-semibold'>Network Name</label>
                    {/* <p className='text-teal-400 text-sm'> alpine/git</p> */}
                  </div>

                  <div className="relative inline-block text-left">
                    <div className="inline-block relative">
                      <button
                        onClick={() => toggleDropdown(3)}
                        name={'option_3'}

                        type="button"
                      // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >

                        <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                        </svg>
                      </button>
                      <ul onMouseLeave={() => setIsDropdownOpen(false)}
                        className={`${isDropdownOpen === 3 ? '' : 'hidden'
                          } absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                      >
                        <li>
                          <button
                            onClick={() => handleOptionSelect('Inspect')}
                            className="block px-4 py-2 bg-gray-600 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect</button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleOptionSelect('Delete')}
                            className="block px-4 py-2 bg-gray-600  hover:bg-gray-500 hover:text-white w-full text-left" > Remove Network
                          </button>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              </div>
            }
            {/* Inspect section */}
            {inspectPopup && selectedOption === 'Inspect' &&
              <>
                <div className='flex justify-center py-2 w-full justify-between'>
                  <div className='flex items-center'>
                    <svg onClick={() => setInspectPopup(false)} className='mr-5' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                    </svg>

                    <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>

                    <label className='ml-3 text-white text-md font-semibold'>Network Name </label>
                  </div>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                  </svg>

                </div>
                <label className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3'>Inspect</label>
                <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                  <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                    <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Path</p>
                    <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1.25.2</p>
                  </div>
                  <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                    <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>NGINX_VERSION</p>
                    <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>342343</p>
                  </div>
                  <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                    <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>NJS_VERSION</p>
                    <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.8.0</p>
                  </div>
                  <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                    <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>pkg_VERSION</p>
                    <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1~bookworm</p>
                  </div>
                  <h2 className=" font-bold mt-2">Port</h2>

                  <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                    <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>80/tcp</p>
                    <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.0.0.0.:50005</p>
                  </div>
                </div>
              </>}
          </div>
        )}

        {/* Upload folder Section */}
        {activePopup === 'Uploadpopup' &&
          <div className=" popup  w-3/12 items-center ">
            {selectedFolder ? (
              <div className=''>
                <h4 className='text-teal-400  mb-4'>File to Image Conversion</h4>

                <div className='flex'><svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 0H2C0.9 0 0 0.9 0 2V16H2V2H14V0ZM13 4L19 10V20C19 21.1 18.1 22 17 22H5.99C4.89 22 4 21.1 4 20L4.01 6C4.01 4.9 4.9 4 6 4H13ZM12 11H17.5L12 5.5V11Z" fill="#E2E2E2" />
                </svg>
                  <label className='text-white ml-2'>{selectedFolder}</label>
                </div>
                {/* <p className='text-white'>{webkitRelativePath}</p> */}
                <p className='text-gray-400 mt-4 text-sm'> Press convert if you want to convert the file into an Image or Cancel if you’re not sure yet</p>
                {/* <input type="file" webkitdirectory="" onChange={handleFolderChange} /> */}

                <div className='flex justify-center mt-8 '>
                  <button
                    className=" mr-4 bg-teal-400 hover:bg-teal-300 font-bold py-1 px-4 rounded items-center"
                  // onClick={() => setSelectedFolder(null)}
                  >
                    Convert
                  </button>
                  <button
                    className=" bg-gray-400 hover:bg-gray-300 font-bold py-1 px-4 rounded items-center"
                    onClick={() => setSelectedFolder(null)}
                  >
                    Cancel
                  </button></div>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <label className='text-white text-center items-center my-4'>
                  Upload the file to convert it into an Image
                </label>
                <input className="item-center ml-8 my-5" type="file" webkitdirectory="" onChange={handleFolderChange} />
              </div>
            )}


          </div>
        }
        {/* List of images Section */}
        {activePopup === 'listImgPopup' &&
          <div className="w-full  h-full">
            {/* <button onClick={() => { setPopupCard(true) }} className=' absolute bg-gray-400 px-2 rounded'>show list</button> */}
            {popupCard ?

              <div id='pop1' className="p-2 popup-main  shadow rounded overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 ">
                <button onClick={() => { setPopupCard(false) }} className='bg-gray-400 px-2 rounded'>X</button>
                <div className='flex justify-between items-center  p-2'>
                  <button 
                  // onClick={() => { setPopupCard(false) }} 
                  className='bg-gray-600 hover:bg-gray-500 px-2 w-16 '>All</button>
                  <button 
                  // onClick={() => { setPopupCard(false) }} 
                  className='bg-gray-600 hover:bg-gray-500 px-2 w-16'>Used</button>
                  <button 
                  // onClick={() => { setPopupCard(false) }} 
                  className='bg-gray-600 hover:bg-gray-500 px-2 w-16'>Unused</button>
                </div>

                <div className="drag-card flex justify-between bg-gray-700 p-4 items-center" id='0'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '0')}
                >
                  <div className='flex '>
                    <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>

                    <div className='ml-3 py-2'>
                      <label className='text-white text-md font-semibold'>alpine</label>
                      <p className='text-teal-400 text-sm'> alpine/git</p>
                    </div>
                  </div>
                  <button type="button" className=" font-semibold bg-teal-400  px-2 text-md  hover:bg-teal-300 rounded-md"
                    onClick={pushtoHub}
                  >Push To Hub</button>
                </div>

                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='1'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '1')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='2'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '2')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='3'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '3')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='4'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '4')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div className="drag-card flex bg-gray-700 p-4 " id='5'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '5')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='6'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '6')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='7'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '7')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='8'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '8')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='9'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '9')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='10'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '10')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='11'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '11')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div
                  className="drag-card flex bg-gray-700 p-4 items-center" id='12'
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, '12')}
                >
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>alpine</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                {/* Add more cards as needed */}
              </div>

              : ''
            }
            {/* Inspect dta======================== */}

            {inspectPopup && selectedOption === 'logs' || selectedOption === 'Inspect' ? (
              <div className='w-11/12 mt-5 m-auto'>
                <div className='flex justify-center py-2 w-full justify-between'>
                  <div className='flex items-center'>
                    <svg onClick={() => setSelectedOption(false)} className='mr-5 cursor-pointer' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                    </svg>

                    <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>

                    <label className='ml-3 text-white text-md font-semibold'>Alipne Name</label>
                  </div>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                  </svg>

                </div>
                <label onClick={() => setLogsInsSwitch(true)} className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3 mr-3'>Logs</label>
                <label onClick={() => setLogsInsSwitch(false)} className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3'>Inspect</label>
                {logsInsSwitch ?
                  <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                    <div className=' text-left p-1  mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>4/8/2020 2:20:55</p>
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
                  :
                  <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Path </p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1.25.2</p>
                    </div>
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>NGINX_VERSION</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>342343</p>
                    </div>
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>NJS_VERSION</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.8.0</p>
                    </div>
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>pkg_VERSION</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1~bookworm</p>
                    </div>
                    <h2 className=" font-bold mt-2">Port</h2>

                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>80/tcp</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.0.0.0.:50005</p>
                    </div>
                  </div>}
              </div>)
              :
              <div className="overflow-hidden flex flex-wrap h-full w-full"
                onDrop={handleDrop}
                onDragOver={allowDrop}
              >

                {draggedCards.map((card, index) => (
                  <div key={index} className="dragged-card md:w-2/6 md:h-40 sm:h-full sm:w-full  flex flex-col  justify-center items-center ">
                    {PopUpMenu(index, card)}
                    {/* {card} */}
                  </div>

                ))}
                {popupVisible && (
                  <div className="popup h-52 w-80 items-center ">
                    <label className='text-white text-center items-center'>Image is  being Converted into Container. </label>
                    <button onClick={handlePopupClose} className="mt-8 w-40 bg-teal-400  font-bold py-1 px-4 rounded  items-center">
                      OK
                    </button>
                  </div>
                )}
              </div>}








            {/* ============================= */}

            {/*Run popup */}
            {runPopupVisible.isopen && (
              <div className="popup w-2/6 ">
                <div>
                  <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                  </svg>

                  <div className='ml-3 py-2'>
                    <label className='text-white text-md font-semibold'>Run new Container</label>
                    <p className='text-teal-400 text-sm'> alpine/git</p>
                  </div>
                </div>
                <div>
                  <button onClick={() => setOptionalData(!optionalData)} className="w-5/6 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded  justify-between flex items-center">
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
                    <div>
                      <input type='text' placeholder='Container Name' className={'bg-gray-600 text-gray-300 w-4/5 mb-3 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />

                      <p className='text-gray-300  items-center  text-sm/[5px] mb-3'>A random name is generated if you do not provide on</p>
                      <p className='text-gray-300  items-center font-bold'>Ports</p>
                      <p className='text-gray-300 items-center text-sm mb-3'>No Ports exports in this Image</p>
                      <select name="assessingclinicianuserid" id="ddlClinican" className=" bg-gray-600 text-gray-400 w-5/6 mb-3 shadow border rounded rounded p-1 text-sm  focus:border-teal-500 focus:outline-none  ">
                        <option className='text-gray-400'>~Select Network~</option>
                        <option className="text-gray-400 " value="1">Network 1  </option>
                        <option className="text-gray-400 " value="2">Network 2  </option>
                        <option className="text-gray-400 " value="3">Network 3  </option>
                        <option className="text-gray-400 " value="4">Network 4  </option>

                      </select>
                      <p className='text-gray-300  font-semibold '>Volumes</p>
                      <div className='w-full flex justify-center items-center '>
                        <input type='text' placeholder="Host Path" className={'bg-gray-600 text-gray-300 mr-2 w-3/6  shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                        <input type='text' placeholder="Container Path" className={'bg-gray-600 text-gray-300 w-3/6 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                        <button onClick={() => setHostShow(true)} className=" text-white hover:bg-teal-400  ml-2 font-bold  rounded  justify-between flex items-center">
                          <svg width="15" height="14" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="8.3291" y1="3.23891e-08" x2="8.3291" y2="16" stroke="white" stroke-width="1.5" />
                            <line x1="16.8423" y1="8.3291" x2="0.000179291" y2="8.3291" stroke="white" stroke-width="1.5" />
                          </svg>
                        </button>

                      </div>

                      {/* add map here  */}
                      {hostshow &&
                        <div className='bg-gray-800 w-full shadow border rounded rounded p-1  border-teal-500 my-1'>
                          <p type='text' placeholder="Container Path" className={' text-gray-300  text-sm '} >Host Path: C:/user/data/host</p>
                          <p type='text' placeholder="Container Path" className={' text-gray-300 text-sm  '} >Container Path: C:/user/data/container</p>
                        </div>
                      }
                      <p className='text-gray-300  font-semibold'>Envirnment Volumes</p>
                      <div className='w-full flex justify-arround'>
                        <input type='text' placeholder="Variable" className={'bg-gray-600 text-gray-300 mr-2 w-3/6  shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                        <input type='text' placeholder="value" className={'bg-gray-600 text-gray-300 w-3/6 shadow border rounded rounded p-1 text-sm text-gray-700 focus:border-teal-500 focus:outline-none '} />
                        <button onClick={() => setVoluemShow(true)} className=" text-white hover:bg-teal-400  ml-2 font-bold  rounded  justify-between flex items-center">
                          <svg width="15" height="14" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="8.3291" y1="3.23891e-08" x2="8.3291" y2="16" stroke="white" stroke-width="1.5" />
                            <line x1="16.8423" y1="8.3291" x2="0.000179291" y2="8.3291" stroke="white" stroke-width="1.5" />
                          </svg>
                        </button>
                      </div>
                      {/* add map here  */}
                      {voluemShow &&
                        <div className='bg-gray-800 w-full shadow border rounded rounded p-1  border-teal-500 my-1'>
                          <p type='text' placeholder="Container Path" className={' text-gray-300  text-sm '} >Variable: xyz</p>
                          <p type='text' placeholder="Container Path" className={' text-gray-300 text-sm  '} >Variable: xyz</p>
                        </div>
                      }

                    </div> : ''}
                </div>
                <div className='flex justify-around '>
                  <button onClick={() => RunHandler()} className="mt-8 w-20 bg-teal-400  font-bold py-1 px-4 rounded  items-center">
                    Run
                  </button>
                  <button onClick={() => setRunPopupVisible({ isopen: false, id: "" })} className="mt-8 w-20 bg-gray-400  font-bold py-1 px-4 rounded  items-center">
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        }
        {/* Containers Section */}

        {activePopup === 'containers' &&
          < div className='w-full flex flex-wrap overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 justify-between  p-3 '>
            <h2 className=" font-bold mt-2 text-teal-300 border-b-[2px]  border-b-teal-200 w-full ">Containers Mapping</h2>


            {/* Containers Section  logs*/}

            {inspectPopup && selectedOption === 'logs' || selectedOption === 'Inspectc' ? (
              <div className='w-11/12 mt-5 m-auto'>
                <div className='flex justify-center py-2 w-full justify-between'>
                  <div className='flex items-center'>
                    <svg onClick={() => setSelectedOption(false)} className='mr-5 cursor-pointer' width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6091 1.60909L9 0L0 9L9 18L10.6091 16.3909L3.21818 9L10.6091 1.60909Z" fill="white" />
                    </svg>

                    <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>

                    <label className='ml-3 text-white text-md font-semibold'>Alipne Name</label>
                  </div>
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.11111 17.7778C1.11111 19 2.11111 20 3.33333 20H12.2222C13.4444 20 14.4444 19 14.4444 17.7778V4.44444H1.11111V17.7778ZM15.5556 1.11111H11.6667L10.5556 0H5L3.88889 1.11111H0V3.33333H15.5556V1.11111Z" fill="#76CDB2" />
                  </svg>

                </div>
                <label onClick={() => setLogsInsSwitch(true)} className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3 mr-3'>Logs</label>
                <label onClick={() => setLogsInsSwitch(false)} className='text-white text-md font-semibold border-b-[2px] border-b-teal-400 mb-3'>Inspect</label>
                {logsInsSwitch ?
                  <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                    <div className=' text-left p-1  mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>4/8/2020 2:20:55</p>
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
                  :
                  <div className="  bg-white border border-gray-300 rounded-lg shadow-lg p-2 mt-2">
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>Path </p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1.25.2</p>
                    </div>
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200  '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>NGINX_VERSION</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>342343</p>
                    </div>
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>NJS_VERSION</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.8.0</p>
                    </div>
                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>pkg_VERSION</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>1~bookworm</p>
                    </div>
                    <h2 className=" font-bold mt-2">Port</h2>

                    <div className=' text-left p-1 py-2 mx-2 flex  border-b-[2px]  border-b-gray-200   '>
                      <p className='cursor-pointer text-sbase font-semibold w-52 text-gray-700'>80/tcp</p>
                      <p className='cursor-pointer text-sbase  text-gray-700 flex items-center'>0.0.0.0.:50005</p>
                    </div>
                  </div>}
              </div>

            )
              :
              <>
                {filteredData.map((x, index) => (
                  <div className=" h-4/6 w-4/6 m-1 card-bg-color  flex flex-col justify-center" id={"card_" + index}>
                    <div className='flex justify-between items-center mx-3'>
                      <label className='text-teal-400 text-right text-sm pr-4'> {running === "card_" + index ? 'Running' : 'Not Running'} </label>
                      <div className="inline-block relative">
                        <button onClick={() => toggleDropdown(index)} type="button" >
                          <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                          </svg>
                        </button>
                        <ul onMouseLeave={() => setIsDropdownOpen(false)}
                          className={`${isDropdownOpen === index ? '' : 'hidden'} absolute right-0 z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow`}
                        >
                          <li>
                            <button
                              onClick={() => handlecontainer('Inspectc')}
                              className="block px-4 py-2 bg-gray-600 hover:bg-gray-500  hover:text-white w-full text-left" > Inspect </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handlecontainer('logs')}
                              className="block px-4 py-2 bg-gray-600  hover:bg-gray-500 hover:text-white w-full text-left" > logs
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
                        <label className='text-white text-md font-semibold'>alpine</label>
                        <p className='text-teal-400 text-sm'> alpine/git</p>
                      </div>
                    </div>
                    <div className='flex justify-evenly px-8 items-center w-full'>
                      <svg onClick={() => setRunPopupVisible({ isopen: true, id: "card_" + ' 0' })} className="cursor-pointer" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.2154 18.9045C9.99558 19.0443 9.80607 19.0443 9.64688 18.9045C9.49527 18.7519 9.38915 18.5359 9.3285 18.2563C9.26786 17.9639 9.26786 17.6779 9.3285 17.3983C9.38915 17.106 9.52559 16.8899 9.73785 16.7501L13.2514 14.4814L9.73785 12.2317C9.52559 12.0919 9.38915 11.8758 9.3285 11.5835C9.26786 11.2911 9.26786 11.0051 9.3285 10.7255C9.38915 10.4332 9.49527 10.2108 9.64688 10.0582C9.80607 9.90572 9.99558 9.90572 10.2154 10.0582L14.4112 12.8227C14.8812 13.1277 15.4615 13.6933 15.4615 14.4814C15.4615 15.2948 14.8812 15.835 14.4112 16.14L10.2154 18.9045Z" fill="#C89125" />
                        <path d="M17.7 19.8895C17.5256 19.8895 17.3816 19.7942 17.2679 19.6035C17.1618 19.4256 17.1087 19.2032 17.1087 18.9362C17.1087 18.6566 17.1618 18.4215 17.2679 18.2308C17.3816 18.0529 17.5256 17.9639 17.7 17.9639H21.964C22.1308 17.9639 22.2672 18.0529 22.3733 18.2308C22.487 18.4215 22.5439 18.6566 22.5439 18.9362C22.5439 19.2032 22.487 19.4256 22.3733 19.6035C22.2672 19.7942 22.1308 19.8895 21.964 19.8895H17.7Z" fill="#C89125" />
                        <path d="M29.85 15.25C29.85 23.3134 23.3134 29.85 15.25 29.85C7.18664 29.85 0.65 23.3134 0.65 15.25C0.65 7.18664 7.18664 0.65 15.25 0.65C23.3134 0.65 29.85 7.18664 29.85 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                      </svg>
                      <svg onClick={() => setRunning('NOT RUNNING')} className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.421 15.25C30.421 23.3134 23.8844 29.85 15.821 29.85C7.75769 29.85 1.22104 23.3134 1.22104 15.25C1.22104 7.18664 7.75769 0.65 15.821 0.65C23.8844 0.65 30.421 7.18664 30.421 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                        <rect x="11.1806" y="10.6108" width="9.28261" height="9.28261" fill="#C89125" />
                      </svg>
                      <svg className="cursor-pointer" width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.9923 15.25C29.9923 23.3134 23.4556 29.85 15.3923 29.85C7.32891 29.85 0.792273 23.3134 0.792273 15.25C0.792273 7.18664 7.32891 0.65 15.3923 0.65C23.4556 0.65 29.9923 7.18664 29.9923 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                        <path d="M15.3922 9.29061C13.8621 9.29109 12.3371 9.86667 11.1707 11.0331C8.83796 13.3658 8.84206 17.1383 11.1734 19.4696C13.5047 21.8009 17.2771 21.805 19.6099 19.4722C21.5785 17.5036 21.8749 14.5172 20.5249 12.2278L19.4272 13.3256C20.2233 14.9873 19.9325 17.0398 18.555 18.4173C16.8081 20.1643 13.9695 20.1652 12.2237 18.4193C10.4778 16.6735 10.4787 13.8349 12.2256 12.088C13.1017 11.2118 14.2468 10.7947 15.3917 10.7996L15.3907 14.1974L19.0851 10.503L15.393 6.81083L15.3922 9.29061Z" fill="#C89125" />
                      </svg>
                      <svg className="cursor-pointer" width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.5642 15.25C30.5642 23.3134 24.0275 29.85 15.9642 29.85C7.90081 29.85 1.36417 23.3134 1.36417 15.25C1.36417 7.18664 7.90081 0.65 15.9642 0.65C24.0275 0.65 30.5642 7.18664 30.5642 15.25Z" stroke="#76CDB2" strokeWidth="1.3" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.933 21.8829C12.0995 21.8829 11.4175 21.2199 11.4175 20.4095V13.0423C11.4175 12.2319 12.0995 11.5689 12.933 11.5689H18.9951C19.8287 11.5689 20.5107 12.2319 20.5107 13.0423V20.4095C20.5107 21.2199 19.8287 21.8829 18.9951 21.8829H12.933ZM18.0782 8.17263L18.6162 8.6957H20.5107C20.9274 8.6957 21.2684 9.02722 21.2684 9.43241C21.2684 9.83761 20.9274 10.1691 20.5107 10.1691H11.4175C11.0007 10.1691 10.6597 9.83761 10.6597 9.43241C10.6597 9.02722 11.0007 8.6957 11.4175 8.6957H13.3119L13.8499 8.17263C13.9863 8.04002 14.1833 7.95898 14.3803 7.95898H17.5478C17.7448 7.95898 17.9418 8.04002 18.0782 8.17263ZM18.6161 13.262C18.2499 13.262 17.9531 13.5588 17.9531 13.925V19.8924C17.9531 20.2586 18.2499 20.5554 18.6161 20.5554C18.9823 20.5554 19.2792 20.2586 19.2792 19.8924V13.925C19.2792 13.5588 18.9823 13.262 18.6161 13.262Z" fill="#C89125" />
                      </svg>

                    </div>
                  </div>

                ))}
              </>}


          </div>
        }


        {/* IMport Image */}
        {activePopup === 'importImgPopup' &&
          < div className='w-full  overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500'>
            <div className=" flex flex-col justify-between items-center  w-full  pt-6 pointer-events">
              <div className="relative w-10/12 flex justify-between ">
                <svg className=" absolute w-4 h-4 inset-y-0 left-2 mt-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  type="search"
                  id="default-search"
                  className="block w-11/12 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                /> <button type="submit" className="text-white  right-2.5 bottom-2.5 bg-teal-400  hover:bg-teal-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-teal-400  dark:focus:ring-blue-800">Search</button>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center '>
              {filteredData.map((x, y) => (
                <div key={y} style={{ backgroundColor: '#17222A' }} className="flex w-11/12 items-center justify-between p-2 my-4 pointer-events">
                  <div className='flex justify-center items-center'>
                    <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                    </svg>
                    <div className='ml-3 py-2'>
                      <label className='text-white text-md font-semibold'>{x.name}</label>
                      <i className='pl-3 text-teal-400 text-sm'>alpine/git</i>
                      <p className='text-gray-400 text-sm font-normal'> version {x.version}</p>
                    </div>
                  </div>
                  <button type="submit" className="text-white  right-2.5 bottom-2.5 current-pointer  hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-gray-400  dark:focus:ring-gray-700">Pull Image</button>
                </div>
              ))}
            </div>
          </div>
        }

        {!activePopup &&
          < p className='text-gray-700 text-6xl font-bold pt-16'>Welcome to Dockur</p>
        }


      </div>
    </div >

  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { getDockerData }

export default connect(mapStateToProps, mapDispatchToProps)(Home)