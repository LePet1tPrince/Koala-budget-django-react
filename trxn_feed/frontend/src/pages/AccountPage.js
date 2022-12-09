import React, { useState, useEffect } from 'react'
import AccTable from '../components/Tables/AccTable'


const AccountPage = () => {

    let [Accounts, setAccounts] = useState([])

    useEffect(() => {
        getAccounts()

    }, [])

    let getAccounts = async () => {
        let response = await fetch('/api/accounts/')
        let data = await response.json()
        setAccounts(data)
        console.log(Accounts)
    }

    var ownAccounts = Accounts.filter(function (account) {
      return account.type === "Own"
    })

    var flowAccounts = Accounts.filter(function (account) {
      return account.type === "Flow"
    })

    const Headers = ['Account Number','Account Name','Account Type','Account Sub-Type']

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