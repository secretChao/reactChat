import './App.css';
import React from 'react';
import ChatCenter from './ChatCenter';

function App() {
  return (
    <div className="row">
        <ChatCenter></ChatCenter>
        <div id="onlineList" className="col-lg-2"></div>
    </div>
  )
}

export default App;
