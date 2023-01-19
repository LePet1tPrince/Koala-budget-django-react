import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AccountContext } from '../pages/AccountPage';
import { useTrxnsContext } from '../context/TrxnContext';
import pencil from '../../Assets/Images/pencil-icon.png';


const TrxnsTable = (props) => {
    
    const { 
        header,
        data,
     } = props;

    //  const { handleTrxnSelect } = useTrxnsContext()

     

  return (
    <div className="table-responsive relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {header.map((title, index) => (
                        <th scope="col" key={index}>{title}</th>
                    ))}

                </tr>
            </thead>
            <tbody> 
                {data.map((item, index) => (
                
                <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.fromAccount}</td>
                        <td>{item.amount}</td>
                        <td>{item.toAccount}</td>
                        <td>{item.notes}</td>
                        <td>
                            <Link to={`/transactions/${item.id}`}>
                                <button className="btn btn-info">
                                    <img src={ pencil } width="20" height="20" alt="Edit Transaction"/>
                                </button>
                            </Link>
                        </td>
                </tr>

                        ))}
                
            </tbody>
            </table>
    </div>
  )
}

export default TrxnsTable