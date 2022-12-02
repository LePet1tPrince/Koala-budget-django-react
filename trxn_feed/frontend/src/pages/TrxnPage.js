import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const TrxnPage = ({ match }) => {

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
          <p>{trxn?.account}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>Amount</h2>
          <p>{trxn?.amount}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>Category</h2>
          <p>{trxn?.category}</p>
        </div>
        <div className="p-2 bd-highlight">
          <h2>notes</h2>
          <p>{trxn?.notes}</p>
        </div>
        <button className="position-relative bottom-0 end-0">Edit Transaction</button>
      </div>
    

      </div>

      </div>
  )
}

export default TrxnPage