import React from 'react'
// import { Link } from 'react-router-dom';


const AccTable = ({ header, data, lookup }) => {
  return (
    <div class="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    {header.map((title, index) => (
                        <th scope="col" key={index}>{title}</th>
                    ))}

                </tr>
            </thead>
            <tbody>
            {data.map((acc, index) => (
                                <tr key={index}>
                                    <th scope="row">{acc.num}</th>
                                    <th>{acc.name}</th>
                                    <th>{acc.type}</th>                           
                                    <th>{acc.subType}</th>
                                </tr>

                            ))}
                
            </tbody>
            </table>
    </div>
  )
}

export default AccTable