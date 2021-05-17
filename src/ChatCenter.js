import React from 'react';
import ReactDOM from 'react-dom';
import NewMsg from './NewMsg';
import OnlineList from './OnlineList';

let ws ;
let logData = [];
export default function ChatCenter () {

    
    let hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
    
    const connect = function() {
        let roomNum = '001';//document.querySelector('#room').value;
        let name = document.querySelector('#name').value;
        if (!name) {
            log('尚未輸入Name!', 'sys');
            return;
        }
        //ws = new SockJS("/connect/" + roomNum );
        ws = new WebSocket('ws://10.2.60.47:8080/chat/connect/' + roomNum + '?name='+name);
        ws.onopen = function () {
            setConnected(true);
            //setName();
            log('伺服器連接成功！', 'sys');
        };
        ws.onmessage = function (event) {
            log(event.data, 'msg');
        };
        ws.onclose = function () {
            setConnected(false);
            log('伺服器連接中斷！', 'sys')
        }
    }
    
    const log = function (value, type) {
        
        let sentMsg;
        let sentDate;
        let sentName;
        let sentType;
        
        if (type === 'msg') {
            let json = JSON.parse(value);
            sentMsg = json.sentMsg;
            sentDate = json.sentDate;
            sentName = json.sentName;
            sentType = json.sentType;
        } else {
            sentMsg = value;
            sentType = 'SYS';
        }
        
        if (sentType === 'LIST') {
            updateOnlinelist(sentMsg);
            return;
        }
    
        logData.push({sentType:sentType, sentDate:sentDate, sentName:sentName, sentMsg:sentMsg});
    
        ReactDOM.render(
            <NewMsg logData={logData} />,
            document.getElementById('log')
        );
        
        //logDiv.scrollTop = logDiv.scrollHeight;
        
        if (!document[hiddenProperty]) {
            message.clear();
        } else {
            message.show();
            windowFlashing();
        }
    }
    
    const disconnect = function () {
        if (ws != null) {
            ws.close();
            ws = null;
        }
        //setConnected(false);
    }
    
    var message = { 
        time: 0, 
        title: document.title, 
        timer: null, 
        // 顯示新訊息提示 
        show: function () { 
            var title = message.title.replace("【新訊息】", ""); 
            // 定時器,設定訊息切換頻率閃爍效果就此產生 
            message.timer = setTimeout(function () { 
                message.time++; 
                message.show(); 
                if (message.time % 2 === 0) { 
                    document.title = "【新訊息】" + title;
                } else {
                    document.title = title;
                }
            }, 600); 
            return [message.timer, message.title]; 
        }, 
        // 取消新訊息提示 
        clear: function () { 
            clearTimeout(message.timer); 
            document.title = message.title; 
        } 
    }; 
    
    var windowFlashing = function () {
        if (!document.querySelector('#pupSwitch').checked) {
            return;
        }
        
        var newWindow = window.open('有新訊息!');
        newWindow.opener = null;
        newWindow.close();
    }
    
    // const setConnected = function (connected) {
    //     document.querySelector("#connect").disabled = connected;
    //     document.querySelector("#disconnect").disabled = !connected;
    //     document.querySelector("#name").disabled = connected;
    //     document.querySelector("#sent").disabled = !connected;
    // }
    
    const sent = function () {
        let text = document.querySelector('#text');
        if (text.value === '') {
            return;
        }
        
        if (ws != null) {
            ws.send(text.value);
            text.value = '';
        } else {
            log('尚未連接！', 'sys')
        }
    }
    
    const updateOnlinelist = function (value) {
        let clientList = Object.values(JSON.parse(value));
        ReactDOM.render(
            <OnlineList clientList={clientList} />,
            document.getElementById('onlineList')
        );
    }

    const clearMsg = function() {
        logData = [];
    	ReactDOM.unmountComponentAtNode(document.getElementById('log'));
    };

    document.addEventListener('keydown', (e) => {
        if(!ws) {
            return;
        }
    	if ((e.key === 'Enter' && e.shiftKey)){	
        	return;
        } else if ((e.key === 'Enter')){
        	sent();
        }
    });

    const [isDisabled, setConnected] = React.useState(false);

    return (
        <div className="jumbotron col-lg-10">
            <div className="form-inline">
                <button type="button" className="btn btn-danger my-1 ml-3 mr-3" id="disconnect" disabled={!isDisabled} onClick={disconnect}>離線</button>

                <label className="my-1 ml-2 mr-1" htmlFor="name">Name:</label>
                <input type="text" id="name" className="form-control" disabled={isDisabled} />
                <button type="button" className="btn btn-info my-1 ml-3 mr-3" id="connect" disabled={isDisabled} onClick={connect}>連接</button>
                <button type="button" className="btn btn-outline-secondary my-1 mr-3" id="clear" onClick={clearMsg}>清除</button>
                <div className="custom-control custom-switch ml-2">
                    <input type="checkbox" className="custom-control-input" id="pupSwitch" defaultChecked />
                    <label className="custom-control-label" htmlFor="pupSwitch">彈窗提醒</label>
                </div>
            </div>
            <div style={{margin: '1rem 0 0 1rem'}}>
                <p>對話紀錄:</p>
                <div id="log" style={{height: 500, overflowY: 'auto'}}></div>
            </div>
            <div>
                <input type="text" id="text" className="col-lg-10" disabled={!isDisabled} style={{height: 40, fontSize: 16, verticalAlign: 'bottom', resize: 'none'}} />
                <div className="col-lg-2" style={{width: '20%', display: 'inline-block', verticalAlign: 'bottom'}}>
                    <input type="button" id="sent" value="發送" className="btn btn-success mr-3" disabled={!isDisabled} onClick={sent} />
                </div>
            </div>
        </div>
    );

}