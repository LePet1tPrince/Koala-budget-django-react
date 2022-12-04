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
            {/* <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Account Number</th>
                      <th scope="col">Account Name</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">Account Sub-Type</th>


                    </tr>
                  </thead>
                  <tbody>
                  {spendAccounts.map((acc, index) => (
                                <tr key={index}>
                                    <th scope="row">{acc.num}</th>
                                    <th>{acc.name}</th>
                                    <th>{acc.type}</th>                           
                                    <th>{acc.subType}</th>
                                </tr>

                            ))}
                    
                  </tbody>
                </table> */}
          </div>
        </div>
    </div>
  )
}

export default AccountPage