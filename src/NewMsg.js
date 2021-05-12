import React from 'react';

export default function NewMsg(props) {
    const datas = props.logData;
    
    const [count, setCount] = React.useState(0);
    const logDiv = document.querySelector("#log");
    
    React.useEffect(() => {
        logDiv.scrollTop = logDiv.scrollHeight;
    });
    
    const eles = datas.map((data, index) => {
        return (
            <div className="text-break" style={data.sentType == 'SYS' ? {color: 'red'} : null} key={index}>
                {data.sentDate ? data.sentDate + ' ' : ''}{data.sentName ? data.sentName + ': ' : ''}{data.sentMsg}
                </div>
                )
            });
    return (
        <div>
            {eles}
        </div>
    );
}