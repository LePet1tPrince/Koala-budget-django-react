import React, { useContext } from 'react';
import TrxnsTable from '../tables/TrxnsTable';
import Plus from '../../assets/Images/plus.svg';
import { Link } from 'react-router-dom';
import FeedData from '../tables/FeedData';
import { useTrxnsContext, useAccountsContext } from '../context/AppContext';


const TrxnsPage = () => {
    const { trxns, handleTrxnSelect, handleNewTrxn } = useTrxnsContext()
    const { accounts } = useAccountsContext()

  const Headers = ['Date','From','Amount','To','Notes'];
  
  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
                <div className="d-flex justify-content-between">
                <h1>Transaction Feed</h1>
                {/* <Link to="/transactions/new"> */}
                <button onClick={() => handleNewTrxn()} className="btn btn-info">
                    <img src= { Plus }  className="img-fluid" width="70" height="50" alt="..."/>
                </button>
                {/* </Link> */}
                </div>
              <TrxnsTable
                header={Headers}
                data={trxns}
                lookup={accounts}
                />
            </div>
        </div>
        {/* <FeedData /> */}
    </div>
  )
}

export default TrxnsPage