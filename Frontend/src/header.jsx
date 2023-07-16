import logo from "./logo.png";
import text from "./text.png";
import React,{ useState } from 'react';
import "./header.css";
import ClickAwayListener from 'react-click-away-listener';

export default function Header() {
  const [popup, setPopup] = useState(false);
  const [popUpMenu, setPopUpMenu] = React.useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [extractedWords, setExtractedWords] = useState([]);
  const handleConnect = () => {
    console.log({ipAddress});
    
    fetch('http://localhost:3001/execute-ssh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ipAddress }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error executing SSH command');
      })
        .then((data) => {
          console.log(typeof(data));
          console.log(data);
          const imageNames = data.map(image => {
            const repoTags = image.RepoTags;
            if (repoTags && repoTags.length > 0) {
              return repoTags[0].split(':')[0]; // Extract the image name without the tag
            }
            return null;
          });
          console.log(imageNames);
          setExtractedWords(imageNames);
      })
      .catch((error) => {
        console.error('API request error:', error);
      });
  };
  const handleInputChange = (event) => {
    setIpAddress(event.target.value);
  };
  
  function PopUpMenu() {
    const handleItemClick = (item) => {
    };
      return(
        <ul className="drop-down">
          {extractedWords.map((word, index) => (
              <li key={index} onClick={() => handleItemClick(word)}>{word}</li>
            ))}
        </ul>)
  }
  return (
    <>
      <header className="head">
        <img src={logo} className="head-logo" alt="logo" />
        <img src={text} className="head-text" alt="text" />
      </header>
      <div className="nav">
        <button type="button" className="connect" onClick={handleConnect}>Connect</button>
        <input type="text" className="ip" placeholder="192.168.0.0" value={ipAddress}
        onChange={handleInputChange}></input>
        <p className="line"><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______________________________</strong></p>
        <button type="button" className="firstbuttons">Create Image</button>
        <button type="button" className="buttons">Import Image</button>
        <button type="button" className="buttons">Export Image</button>
        <button type="button" className="buttons" onClick={() => setPopUpMenu(!popUpMenu)}>List of Images ⮟</button>
        {popUpMenu && (
          <PopUpMenu
            extractedWords={extractedWords}
          />
        )}
        <button className="buttons" onClick={()=>setPopup(true)}>Data Code ⮟</button>
        {popup && (
            <ClickAwayListener onClickAway={() => setPopup(false)}>
                    <div className={'popup'}>
                        <li>Items of the Popup</li>
                        <li>Items of the Popup</li>
                        <li>Items of the Popup</li>
                    </div>
            </ClickAwayListener>
        )}
        
        <button type="button" className="buttons">Kubernetes</button>
      </div>
      <div className="bottom">
        <img src={logo} className="bottom-img" alt="img" />
      </div>
    </>
  );
}

