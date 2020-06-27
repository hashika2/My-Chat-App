import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const InfoBar = ({ room ,getData}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <input type="submit" value="getData" onKeyPress={event => event.key === 'Enter' ? getData(event) : null}/>
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;