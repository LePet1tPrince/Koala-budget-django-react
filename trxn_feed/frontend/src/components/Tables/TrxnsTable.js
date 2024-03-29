import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AccountContext } from '../pages/AccountPage';
import { useTrxnsContext } from '../context/TrxnContext';
import pencil from '../../Assets/Images/pencil-icon.png';
import DataTable from 'react-data-table-component';
import TrxnEditInline from '../editComponents/TrxnEditInline';


const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

const TrxnsTable = (props) => {
    

    const { 
        header,
        data,
     } = props;

    //  const { handleTrxnSelect } = useTrxnsContext()
    const columns = [
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
        },
        {
            name: 'From',
            selector: row => row.fromAccount,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
            
        },
        {
            name: 'To',
            selector: row => row.toAccount,
            sortable: true,
        },
        {
            name: 'Notes',
            selector: row => row.notes,
        },
    ];

    const conditionalRowStyles = [
        {
          when: row => row.amount < 300,
          style: {
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
        // You can also pass a callback to style for additional customization
        {
          when: row => row.amount < 400,
          style: row => ({ backgroundColor: row.isSpecial ? 'pink' : 'inherit' }),
        },
      ];

     

  return (
    <div >
        <div>
            <DataTable
            columns={columns}
            data={data}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            selectableRows
            selectableRowsHighlight
            striped
            expandableRows
            expandableRowsComponent={TrxnEditInline}
            conditionalRowStyles={conditionalRowStyles}
            pagination
            />
            
        </div>
        {/* <table className="table w-full text-sm text-left text-gray-500 dark:text-gray-400 table-striped table-hover">
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
            </table> */}
    </div>
  )
}

export default TrxnsTable