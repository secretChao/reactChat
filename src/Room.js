import React from 'react';
import ChatCenter from './ChatCenter';
import OnlineList from './OnlineList';

export default function Room () {
    return (
        <div className="row">
            <ChatCenter></ChatCenter>
            <OnlineList clientList={null}></OnlineList>
        </div>
    );
    
}
