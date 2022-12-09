import React, { useState, useEffect } from 'react';


function TrxnAdd() {
  const [date, setDate] = useState("");
  let [Accounts, setAccounts] = useState([])
  let [account, setAccount] = useState(0)
  let [amount, setAmount] = useState(0)
  let [category, setCategory] = useState(0)
  let [notes, setNotes] = useState("")

    useEffect(() => {
        getAccounts()

    }, [])

    let getAccounts = async () => {
        let response = await fetch('/api/accounts/')
        let data = await response.json()
        setAccounts(data)
        console.log(Accounts)
    }

    function handleSubmit(e) {
      e.preventDefault();
      console.log('Submitted')

    }



  return (
    <div className="sidebar-margin">
      <div className="border border-primary w-75 h-75vh m-5">
      <div className="d-flex flex-row bd-highlight mb-3 flex-wrap">
      <form onSubmit={handleSubmit}>
        <div className="p-2 bd-highlight">
          <label>
            Date
          </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
        </div>

        <div className="p-2 bd-highlight">
          <label>
            Account
          </label>
          <select onChange={(e) => setAccount(e.target.value)}>
          {Accounts.map((acc, index) => (
            <option value={index + 1}>{acc.name} - {acc.type} - {acc.subType}</option>
                            ))}
          </select>
        </div>

        <div className="p-2 bd-highlight">
          <label>
            Amount
          </label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </div>

        <div className="p-2 bd-highlight">
          <label>
            Category
          </label>
          <select onChange={(e) => setCategory(e.target.value)}>
          {Accounts.map((acc, index) => (
            <option value={index + 1}>{acc.name} - {acc.type} - {acc.subType}</option>
                            ))}
          </select>
        </div>

        <div className="p-2 bd-highlight">
          <label>
            Notes
          </label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          
        </div>
        <input type="submit" value="Submit" />

      </form>

        
      </div>
    

      </div>

      </div>
  )
}

export default TrxnAdd