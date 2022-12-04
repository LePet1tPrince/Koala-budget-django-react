import React from 'react'
import { Link } from 'react-router-dom';


const FeedTable = ({ header, data, lookup }) => {
  return (
    <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    {header.map((title, index) => (
                        <th scope="col" key={index}>{title}</th>
                    ))}

                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                
                <tr key={index}>
                        <th scope="row">{item.date}</th>
                        <th>{item.amount}</th>
                        <th>{lookup[item.account-1].name}</th>
                        {/* <th>{item.account}</th> */}
                        {/* <th>{item.category}</th> */}
                        <th>{lookup[item.category-1].name}</th>
                        <th>{item.notes}</th>
                    <Link to={`/trxn/${item.id}`}>
                        <button>Edit Transaction</button>
                    </Link>
                </tr>

                        ))}
                
            </tbody>
            </table>
    </div>
  )
}

export default FeedTable