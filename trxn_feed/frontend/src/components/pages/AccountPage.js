import React, { useState, useEffect } from 'react';
import AccTable from '../tables/AccTable';
import { useAccountsContext } from '../context/AppContext';
import Plus from '../../assets/Images/plus.svg';




const AccountPage = () => {
    const { accounts, handleAccountSelect, selectedAccountId, handleAccountSubmit } = useAccountsContext()
    const [ ownAccounts, setOwnAccounts ] = useState(accounts.filter(function (account) {
      return account.type === "Own"
    }))
    const [flowAccounts, setFlowAccounts ] = useState(accounts.filter(function (account) {
      return account.type === "Flow"
    }))

    useEffect(() => {
      var ownAcc = accounts.filter(function (account) {
        return account.type === "Own"
      })
  
      var flowAcc = accounts.filter(function (account) {
        return account.type === "Flow"
      })
        setOwnAccounts(ownAcc)
        setFlowAccounts(flowAcc)


    }, [accounts])

   

    // var ownAccounts2 = accounts.filter(function (account) {
    //   return account.type === "Own"
    // })

    // var flowAccounts = accounts.filter(function (account) {
    //   return account.type === "Flow"
    // })

    const Headers = ['Account Number','Account Name','Account Type','Account Sub-Type']



  return (
    <div>
        <div className='feed-list sidebar-margin'>
          <button className="btn btn-info">
            <img src= { Plus }  className="img-fluid" width="70" height="50" alt="..."/>
          </button>
          <div className="p-5 m-5">
            <h2>Owner Accounts</h2>
            <AccTable header={Headers}
            data={ownAccounts}
            handleAccountSelect={handleAccountSelect}
            selectedAccountId={selectedAccountId}
            handleAccountSubmit={handleAccountSubmit}
            />

                
          </div>
          <div className="p-5 m-5">
            <h2>Spend Accounts</h2>
            <AccTable header={Headers} 
            data={flowAccounts}
            handleAccountSelect={handleAccountSelect}
            selectedAccountId={selectedAccountId}
            handleAccountSubmit={handleAccountSubmit}
            />
        
          </div>
        </div>
    </div>
  )
}

export default AccountPage