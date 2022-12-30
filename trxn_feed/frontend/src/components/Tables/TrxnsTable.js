import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AccountContext } from '../pages/AccountPage';


const TrxnsTable = (props) => {
    const { 
        header,
        data,
        lookup
     } = props;

     

  return (
    <div className="table-responsive">
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
                        <th>{item.account}</th>
                        <th>{item.category}</th>
                        <th>{item.notes}</th>
                    <Link to={`/transactions/${item.id}`}>
                        <button>Edit Transaction</button>
                    </Link>
                </tr>

                        ))}
                
            </tbody>
            </table>
            {/* <div>{accountList}</div> */}
    </div>
  )
}

export default TrxnsTable