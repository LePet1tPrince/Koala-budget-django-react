import React, { useState, useEffect } from 'react';
import AccTable from '../tables/AccTable';
import { useAccountsContext } from '../context/AppContext';
import Plus from '../../assets/Images/plus.svg';




const AccountPage = () => {
    const { accounts, handleAccountSelect, selectedAccountId } = useAccountsContext()
    

    var ownAccounts = accounts.filter(function (account) {
      return account.type === "Own"
    })

    var flowAccounts = accounts.filter(function (account) {
      return account.type === "Flow"
    })

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
            selectedAccountId={selectedAccountId}/>

                
          </div>
          <div className="p-5 m-5">
            <h2>Spend Accounts</h2>
            <AccTable header={Headers} 
            data={flowAccounts}
            handleAccountSelect={handleAccountSelect}
            selectedAccountId={selectedAccountId}/>
        
          </div>
        </div>
    </div>
  )
}

export default AccountPage