import React, { useState } from 'react';
import logo from "../Assets/logo.png";
import text from "../Assets/text.png";
import "./header.css";
import { useLocation, useNavigate } from 'react-router-dom';

import ClickAwayListener from 'react-click-away-listener';

export default function Sidebar() {
    const [popup, setPopup] = useState(false)
    const [popUpMenu, setPopUpMenu] = useState(false);
    let navigate = useNavigate();

    const handleSideBarClick = () => {
        navigate('./contaner')

    }

    const PopUpMenu = () => {
        return (
            <ul className="drop-down" >
                <li className='bg-teal pl-2 list-none'>Menu-item-1</li>
                <li className='bg-teal pl-2 list-none'>Menu-item-2</li>
                <li className='bg-teal pl-2 list-none'>Menu-item-3</li>
            </ul >
        );
    }
    return (
        <div className="nav relative  items-center flex flex-col h-full bg-teal-200">
            <p className='bg-color text-3xl my-2 text-teal-400'>Connect</p>
            <input type="text" className="text-white ip my-2 w-10/12 p-2 rounded-md border-b item-center" placeholder="192.168.0.0"></input>
            <button type="button" className=" font-semibold   p-1 text-md w-10/12 rounded-md bg-teal">Connect</button>
            {/* <p className="line"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________________</strong></p> */}
            <button class="w-44 mt-3 text-white bg  font-bold py-2 px-4 rounded inline-flex items-center">
                <span className='mr-3'>Create Image</span>
            </button>
            <button  onClick={() =>handleSideBarClick()  }  class="w-44 text-white bg  font-bold py-2 px-4 rounded inline-flex items-center">
                {/* <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
                <span className='mr-3'>List of Images</span>
                <svg class="fill-current w-4 h-4 mr-2 " viewBox="0 0 80 40">
                    <rect width="60" height="10"></rect>
                    <rect y="20" width="60" height="10"></rect>
                    <rect y="40" width="60" height="10"></rect>
                </svg>
            </button>
            <button class="w-44 text-white bg  font-bold py-2 px-4 rounded inline-flex items-center">
                {/* <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
                <span className='mr-3'>Containers</span>

            </button>
            {/* {popUpMenu && PopUpMenu()} */}
            
            {/* <button class="w-44 text-white bg font-bold py-1 px-4 rounded inline-flex items-center" onClick={() => setPopup(true)}>Data Code ⮟</button>
            {popup && (
                <ClickAwayListener onClickAway={() => setPopup(false)}>
                    <div className={'popup'}>
                        <li className='bg rounded text-white list-none text-sm w-32'>Items of the Popup</li>
                        <li className='bg rounded text-white list-none text-sm w-32'>Items of the Popup</li>
                        <li className='bg rounded text-white list-none text-sm w-32'>Items of the Popup</li>
                    </div>
                </ClickAwayListener>
            )} */}


            <button class="w-44 text-white bg  font-bold py-2 px-4 rounded inline-flex items-center">
                {/* <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg> */}
                <span className='mr-3'>Kubernetes</span>
                <svg class="fill-current w-4 h-4 mr-2 " viewBox="0 0 80 40">
                    <rect width="60" height="10"></rect>
                    <rect y="20" width="60" height="10"></rect>
                    <rect y="40" width="60" height="10"></rect>
                </svg>
            </button>
            <div className="w-full absolute bottom-0 mt-12 bg-teal flex justify-center p-2">
                <img src={logo} className="bottom-img shadow self-center" alt="img" />
            </div>
        </div>

    );
}
