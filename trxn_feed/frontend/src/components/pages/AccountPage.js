import React, { useState, useEffect } from 'react';
import AccTable from '../tables/AccTable';
import Plus from '../../assets/Images/plus.svg';
import { useAccountsContext } from '../context/AccountContext';





const AccountPage = () => {
    const { accounts,  handleAccountAdd } = useAccountsContext()
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
        console.log("updated own and flow accounts")


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
          <button className="btn btn-info" onClick={() => handleAccountAdd()}>
            <img src= { Plus }  className="img-fluid" width="70" height="50" alt="..."/>
          </button>
          <div className="p-5 m-5">
            <h2>Owner Accounts</h2>
            <AccTable header={Headers}
            data={ownAccounts}
          
            />

                
          </div>
          <div className="p-5 m-5">
            <h2>Spend Accounts</h2>
            <AccTable header={Headers} 
            data={flowAccounts}
            />
        
          </div>
        </div>
    </div>
  )
}

export default AccountPage