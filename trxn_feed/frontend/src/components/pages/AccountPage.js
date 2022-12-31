import React, { useState, useEffect } from 'react';
import AccTable from '../tables/AccTable';
import { useAccountsContext } from '../context/AppContext';



const AccountPage = () => {
    const { accounts } = useAccountsContext()
    

    var ownAccounts = accounts.filter(function (account) {
      return account.type === "Own"
    })

    var flowAccounts = accounts.filter(function (account) {
      return account.type === "Flow"
    })

    const Headers = ['Account Number','Account Name','Account Type','Account Sub-Type']

    const accountList = accounts.map(x => x['name'])

    const accountContextValue = {
      handleAccountAdd,
      accountList

    }

    function handleAccountAdd(id) {
      console.log("handling account add")
    }

  return (
    <div>
        <div className='feed-list sidebar-margin'>
            <div className="p-5 m-5">
              <h2>Owner Accounts</h2>
              <AccTable header={Headers} data={ownAccounts}/>

                
          </div>
          <div className="p-5 m-5">
            <h2>Spend Accounts</h2>
            <AccTable header={Headers} data={flowAccounts}/>
        
          </div>
        </div>
    </div>
  )
}

export default AccountPage