import React, { useState, useEffect, useContext } from 'react';
import TrxnsTable from '../Tables/TrxnsTable';
import Plus from '../../Assets/Images/plus.svg';
import { Link } from 'react-router-dom';
import { useTrxnsContext } from '../context/TrxnContext';
import { useAccountsContext } from '../context/AccountContext';
import OwnAccountCard from '../Cards/OwnAccountCard';



const TrxnsPage = () => {
    const { trxns, handleTrxnSelect, handleNewTrxn, getFilteredTrxns } = useTrxnsContext()
    const { accounts } = useAccountsContext()
    const [selectedAccountName, setSelectedAccountName] = useState();

  const Headers = ['Date','From','Amount','To','Notes'];

  const displayCards = accounts.filter(function(acc) {
    return acc.type ==="Own"
  }).sort((a,b) => a.num - b.num);

  const filteredTrxns = trxns.filter(function(trxn) {
    return trxn.fromAccount === selectedAccountName | trxn.toAccount === selectedAccountName
  })

  // useEffect(() => {
  //   setFilteredTrxns([]);
  // },[])

  // function handleTransactionsFilter(name) {
  //   const filTrxns = trxns.filter(function(trxn) {
  //     return trxn.fromAccount === name
  //   }).sort((a,b) => a.num - b.num);
  //   setFilteredTrxns(filTrxns);
    

  // }

  
  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
            <div>
                  {displayCards.map(acc => {
                    return <OwnAccountCard key={acc.id} account={acc} setSelectedAccountName={setSelectedAccountName}/>
                  })}
                </div>
                <div className="d-flex justify-content-between">
                <h1>{selectedAccountName} Transactions</h1>
                
                <button onClick={() => handleNewTrxn()} className="btn btn-info">
                    <img src= { Plus }  className="img-fluid" width="70" height="50" alt="..."/>
                </button>
                </div>
                
              {/* <TrxnsTable
                header={Headers}
                data={trxns.sort((a, b) => a.date - b.date)}
                /> */}
              <TrxnsTable
                header={Headers}
                data={filteredTrxns.sort((a, b) => a.date - b.date)}
                />
            </div>
        </div>
    </div>
  )
}

export default TrxnsPage