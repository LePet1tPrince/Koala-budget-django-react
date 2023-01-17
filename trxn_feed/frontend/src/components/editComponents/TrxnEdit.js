import React, { useState, useEffect } from 'react';
import { useTrxnsContext } from '../context/TrxnContext';
import { useAccountsContext } from '../context/AccountContext';
import {
  Link
} from "react-router-dom";
import { useParams } from 'react-router-dom';


function TrxnEdit({ match }) {
  let { id } = useParams();
  const [editedTrxn, setEditedTrxn ] = useState();

  const { trxns, 
    selectedTrxnId, 
    handleTrxnSelect, 
    handleTrxnSubmit,
    handleTrxnChange,
    handleTrxnDelete,
    selectedTrxn
   } = useTrxnsContext()

   const { accounts } = useAccountsContext();

   
   
   useEffect(() => {
     handleTrxnSelect(parseInt(match.params.id))
    },[])

    useEffect(() => {
     setEditedTrxn(selectedTrxn)
     console.log("selected id:", selectedTrxn)

    },[selectedTrxn])
    

  function handleChange(changes) {
    setEditedTrxn({...editedTrxn, ...changes})
    console.log({...editedTrxn})

  }


    function handleSubmit(e, editedTrxn) {
      e.preventDefault();
      console.log("edited Trxn:", editedTrxn);
      handleTrxnSubmit(editedTrxn)
      alert('successfully submitted')
    }

  return (
    <div className="sidebar-margin">
    
          
    {selectedTrxn &&
      
      <div className="bg--s-info w-75 h-75vh m-5 rounded rounded-5 p-5">
          <div className="d-flex w-50">
              <div className="mr-auto p-2">
                  <Link to="/transactions">
                <button className="btn btn-info mx-3 mr-auto p-2" >&#60; Back to Feed
                    </button>
                  </Link>
                    </div>
              <div className="p-2">
              <button className="btn btn-danger" onClick={() => handleTrxnDelete(selectedTrxnId)}>Delete Transaction</button>
                </div>
            </div>
        <form onSubmit={(e) => handleSubmit(e, editedTrxn)}>
          <div className="form-group">
            <label className="trxn-edit-form__label">Date</label>
            <input className="trxn-edit-form__input"
            type="date"
            name="date"
            defaultValue={selectedTrxn.date}
            onChange={e => handleChange({date: e.target.value})}
            ></input>
          </div>
          <div className="form-group">
            <label className="trxn-edit-form__label">From</label>
            <select className="trxn-edit-form__input" 
            name='fromAccount' 
            defaultValue={selectedTrxn.fromAccount}
            onChange={e => handleChange({fromAccount: e.target.value})}
            >
              {accounts.map((account, index) => (
                <option key={index} value={account.id}>{account.name}  - {account.subType}</option>
              ))}
            </select>
            </div>
         
          <div className="form-group">
            <label className="trxn-edit-form__label">Amount</label>
            <input className="trxn-edit-form__input" 
            type="currency" 
            name='amount' 
            defaultValue={selectedTrxn.amount}
            onChange={e => handleChange({amount: parseFloat(e.target.value)})}
            ></input>
            </div>
            <div className="form-group">
            <label className="trxn-edit-form__label">To</label>
            <select className="trxn-edit-form__input" 
            name='toAccount' 
            defaultValue={selectedTrxn.toAccount}
            onChange={e => handleChange({toAccount: e.target.value})}
            >
               {accounts.map((account, index) => (
                <option key={index} value={account.id}>{account.name} - {account.subType}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="trxn-edit-form__label">Notes</label>
            <textarea className="trxn-edit-form__input" 
            name='notes' 
            defaultValue={selectedTrxn.notes}
            onChange={e => handleChange({notes: e.target.value})}
            ></textarea>
            </div>
            <input type="submit"
            className="trxn-edit-form__submit-btn btn btn-success" value="Submit"></input>

        </form>
      </div>
          }
    </div>
  )

}

export default TrxnEdit
