import React from 'react';
import Clock from './Clock';

import './Header.css';
import DataElements from './DataElements';

export default function Header() {
  return (
    <div className="header">
      <div className="timeContainer">
        <h4 className="time">
          <Clock format="h:mm A" update={1000}/>
        </h4>
        <h4 className="date">
          <Clock format="MMMM Do, YYYY" update={1000}/>
        </h4>
      </div>
      <DataElements/>
    </div>
  );
}
