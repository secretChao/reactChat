import React from 'react';

// let onlineData = [];

// const updateOnlinelist = function (value) {
//     let clientList = Object.values(JSON.parse(value));
//     // ReactDOM.render(
//     //     <OnlineList clientList={clientList} />,
//     //     document.getElementById('onlineList')
//     // );
//     OnlineList.data = [];
//     OnlineList.data.push(clientList);
// }

export default function OnlineList(props) {

    const data = props.clientList;

    const tmpl = !data ? (<tr></tr>) : data.map((client, index) => {
        return (
            <tr key={index}>
                <td>{client}</td>
            </tr>
        )
    });

    return (
        <div>
            <table className="table table-striped" aria-describedby="在線清單">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">在線清單</th>
                    </tr>
                </thead>
                <tbody>{tmpl}</tbody>
            </table>	
	    </div>
    );
}