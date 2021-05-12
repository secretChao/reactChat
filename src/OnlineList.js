import React from 'react';
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
        <div className="col-lg-2" id="onlineList">
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