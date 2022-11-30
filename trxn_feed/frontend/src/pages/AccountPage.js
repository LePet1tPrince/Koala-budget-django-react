import React, { useState, useEffect } from 'react'


const AccountPage = () => {

    let [Accounts, setAccounts] = useState([])

    useEffect(() => {
        getAccounts()

    }, [])

    let getAccounts = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/accounts/')
        let data = await response.json()
        setAccounts(data)
        console.log(Accounts)
    }

  return (
    <div>
        <div className='feed-list'>
            <div className="p-5 m-5">
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Account Number</th>
      <th scope="col">Account Name</th>
      <th scope="col">Account Type</th>

    </tr>
  </thead>
  <tbody>
  {Accounts.map((acc, index) => (
                <tr key={index}>
                    <th scope="row">{acc.accNum}</th>
                    <th>{acc.accName}</th>
                    <th>{acc.accType}</th>
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