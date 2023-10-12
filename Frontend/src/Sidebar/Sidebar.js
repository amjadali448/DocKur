import React, { useState } from 'react';
import logo from "../Assets/logo.png";
// import text from "../Assets/text.png";
// import "./header.css";
import { useNavigate } from 'react-router-dom';

import ClickAwayListener from 'react-click-away-listener';

export default function Sidebar() {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupCard, setPopupCard] = useState(false);

    const [Uploadpopup, setUploadpopup] = useState(false)
    // const [popUpMenu, setPopUpMenu] = useState(false);
    let navigate = useNavigate();

    const handlePopupOpen = () => {
        console.log('iwhakjfdkjfh');
        setPopupVisible(true);
    };
    // onClick={handlePopupOpen}

    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleFolderChange = (event) => {
        const folder = event.target.files[0];

        if (folder && folder.webkitRelativePath) {
            const folderPath = folder.webkitRelativePath.split('/')[0];
            setSelectedFolder(folderPath);
        }
    };

    return (
        <div className="nav relative  items-center flex flex-col h-full bg-teal-200">
            <p className='text-3xl my-2 text-teal-400'>Connect</p>
            <input type="text" className="text-white ip my-2 w-10/12 p-2 rounded-md border-b item-center" placeholder="192.168.0.0"></input>
            <button type="button" className=" font-semibold bg-teal-400  p-1 text-md w-10/12 rounded-md">Connect</button>
            <button className="w-44 mt-3 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => setUploadpopup(true)}>
                <span className='mr-3'>Create Image</span>
            </button>
            <button onClick={() => navigate('./contaner')} className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
                {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
                <span className='mr-3'>List of Images</span>
                <svg className="fill-current w-4 h-4 mr-2 " viewBox="0 0 80 40">
                    <rect width="60" height="10"></rect>
                    <rect y="20" width="60" height="10"></rect>
                    <rect y="40" width="60" height="10"></rect>
                </svg>
            </button>
            <button className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
                <span className='mr-3'>Containers</span>

            </button>
            {/* {popUpMenu && PopUpMenu()} */}
            {/* <button className="w-44 text-white hover:bg-teal-400  font-bold py-1 px-4 rounded inline-flex items-center" onClick={() => setPopup(true)}>Data Code ⮟</button> */}
            {/* {popup && (
                <ClickAwayListener
                // onClickAway={() => setPopup(false)}
                >
                    <div className={'popup'}>
                        <li className='hover:bg-teal-400 rounded text-white list-none text-sm w-32'>Items of the Popup</li>
                        <li className='hover:bg-teal-400 rounded text-white list-none text-sm w-32'>Items of the Popup</li>
                        <li className='hover:bg-teal-400 rounded text-white list-none text-sm w-32'>Items of the Popup</li>
                    </div>
                </ClickAwayListener>
            )} */}

            <button
                onClick={() => navigate('./importImg')}
                // onClick={ navigate('./importImg')} 
                className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
                {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
                <span className='mr-3'>Import Image</span>

            </button>
            <button className="w-44 text-white hover:bg-teal-400  font-bold py-2 px-4 rounded inline-flex items-center">
                {/* <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
                <span className='mr-3'>Create Network</span>
                {/* <svg className="fill-current w-4 h-4 mr-2 " viewBox="0 0 80 40">
                    <rect width="60" height="10"></rect>
                    <rect y="20" width="60" height="10"></rect>
                    <rect y="40" width="60" height="10"></rect>
                </svg> */}
            </button>
            <input type="text" className="text-white ip my-2 w-44 p-1 rounded-md item-center" placeholder="Network Name..."></input>
            <button type="button" className=" font-semibold bg-teal-400  p-1 text-md w-10/12 hover:bg-teal-300 rounded-md" onClick={handlePopupOpen}>Create</button>

            {popupVisible ? (
                <div style={{ left: ' 249%' }} className=" popup h-52 w-80 items-center ">
                    <label className='text-white text-center items-center'>Image is  being Converted into Container. </label>
                    <button className="mt-8 w-40 bg-teal-400 hover:bg-teal-300 font-bold py-1 px-4 rounded  items-center" onClick={() => setPopupVisible(false)}>
                        ok
                    </button>
                </div>
            ) : ''}
            {Uploadpopup ? (
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
            ) : ''}
            {popupCard ?

                <div style={{ width: '300px', left: '80%' }} id='pop1' className="p-2 absolute  popup-main  shadow rounded overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500 ">
                    {/* <button onClick={() => { setPopupCard(false) }} className='bg-gray-400 px-2 rounded'>X</button> */}
                    <button onClick={() => { setPopupCard(false) }} className='bg-gray-600 hover:bg-gray-500 px-2 w-9/12 '>Remove Unused Networks</button>


                    <div className=" flex bg-gray-700 p-4 items-center justify" id='0'

                    // onDragStart={(e) => handleDragStart(e, '0')}
                    >
                        <div className='flex justify-center ml-3 py-2'>
                            <svg className='ml-2' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
                            </svg>

                            <label className='ml-3 text-white text-md font-semibold'>Network Name</label>
                            {/* <p className='text-teal-400 text-sm'> alpine/git</p> */}
                        </div>
                        <svg width="5" height="17" viewBox="0 0 5 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="6.47754" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                            <rect y="12.9531" width="4.04709" height="4.04709" rx="2.02354" fill="#F2F2F2" />
                        </svg>
                    </div>

                    <div
                        className="drag-card flex bg-gray-700 p-4 items-center" id='1'
                        draggable="true"
                    // onDragStart={(e) => handleDragStart(e, '1')}
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
                    // onDragStart={(e) => handleDragStart(e, '2')}
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
                    // onDragStart={(e) => handleDragStart(e, '3')}
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
                    // onDragStart={(e) => handleDragStart(e, '4')}
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

            <div className="w-full absolute bottom-0 mt-12 bg-teal-400 flex justify-center p-2">
                <img src={logo} className="bottom-img shadow self-center" alt="img" />
            </div>
        </div>

    );
}
