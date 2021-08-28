import React from 'react'
import './Table.css'
function Table({countires_props}){
    // console.log("From Table Component",countries);
    // return <div>Hello</div>
    return (<div className="table">
            {countires_props.map(({country,cases})=>(
                <tr>
                    <td>{country}</td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
    </div>
    );
}

export default Table;
