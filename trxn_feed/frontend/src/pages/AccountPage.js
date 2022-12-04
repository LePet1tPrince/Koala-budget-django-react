import React, { useState, useEffect } from 'react'


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

    var spendAccounts = Accounts.filter(function (account) {
      return account.type === "Flow"
    })

  return (
    <div>
        <div className='feed-list sidebar-margin'>
            <div className="p-5 m-5">
              <h2>Owner Accounts</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Account Number</th>
                      <th scope="col">Account Name</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">Account Sub-Type</th>


                    </tr>
                  </thead>
                  <tbody>
                  {ownAccounts.map((acc, index) => (
                                <tr key={index}>
                                    <th scope="row">{acc.num}</th>
                                    <th>{acc.name}</th>
                                    <th>{acc.type}</th>                           
                                    <th>{acc.subType}</th>
                                </tr>

                            ))}
                    
                  </tbody>
                </table>

          </div>
          <div className="p-5 m-5">
            <h2>Spend Accounts</h2>
            <table className="table table-striped">
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
                </table>
          </div>
        </div>
    </div>
  )
}

export default AccountPage