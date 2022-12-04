import React, { useState, useEffect } from 'react';


const TrxnPage = ({ match, history }) => {

    let trxnId = match.params.id
    let [trxn, setTrxn] = useState(null)

    useEffect(()=> {

        getTrxn()
    }, [trxnId])

    let getTrxn = async ()=> {
        let response = await fetch(`/api/feed/${trxnId}`)
        let data = await response.json()
        setTrxn(data)
    }

    let updateTrxn = async () => {
      fetch(`api/feed/${trxnId}/update`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        notes:JSON.stringify(...trxn)
    })
  }
    let handleSubmit = () => {
      updateTrxn()
      // history.push('/')
    }

    

  return (
    <div className="sidebar-margin">
      <div className="border border-primary w-75 h-75vh m-5">
      <div className="d-flex flex-row bd-highlight mb-3 flex-wrap">
        <div className="p-2 bd-highlight">
          <h2>Date</h2>
          <p>{trxn?.date}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>Account</h2>
          {/* <p>{Accounts[trxn?.account-1].name}</p> */}

          <p>{trxn?.account}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>Amount</h2>
          {/* <textarea defaultValue={trxn?.amount}></textarea> */}
          <p>$ {trxn?.amount}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>Category</h2>
          <p>{trxn?.category}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>notes</h2>
          <textarea onChange={(e) => { setTrxn({ ...trxn, 'notes': e.target.value }) }}defaultValue={trxn?.notes}></textarea>

        </div>
        <button  onClick={handleSubmit} className="position-relative bottom-0 end-0">Save</button>
      </div>
    

      </div>

      </div>
  )
}

export default TrxnPage