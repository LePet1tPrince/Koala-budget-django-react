import React, { useState, useEffect } from 'react';
import { useTrxnsContext } from '../context/TrxnContext';
import { useAccountsContext } from '../context/AccountContext';
import {
  Link
} from "react-router-dom";
import { useParams } from 'react-router-dom';


function TrxnEditInline({ data }) {

  const [editedTrxn, setEditedTrxn ] = useState(data);
  const [selectedTrxn, setSelectedTrxn ] = useState(data);

  useEffect(() => {
    // alert(JSON.stringify(selectedTrxn))
    // alert()
    
  })



  const { trxns, 
    selectedTrxnId, 
    handleTrxnSelect, 
    handleTrxnSubmit,
    handleTrxnChange,
    handleTrxnDelete,
    // selectedTrxn
   } = useTrxnsContext()

   const { accounts } = useAccountsContext();


   function handleChange(changes) {
    setEditedTrxn({...editedTrxn, ...changes})
    console.log(JSON.stringify({...editedTrxn, ...changes}))

  }

   function handleSubmit(e, editedTrxn) {
    e.preventDefault();
    console.log("edited Trxn:", {...editedTrxn, fromAccount: findAccountId(editedTrxn.fromAccount), toAccount: findAccountId(editedTrxn.toAccount)});
    // console.log("edited Trxn:", editedTrxn);

    handleTrxnSubmit({...editedTrxn, fromAccount: findAccountId(editedTrxn.fromAccount), toAccount: findAccountId(editedTrxn.toAccount)})
    // alert('successfully submitted')
  }
  function findAccountId(name) {
    // const accId = accounts.filter(function (account) {
    //   return account.name === name})
    const index = accounts.findIndex(t => t.name === name)
    // alert(index)
    // alert(typeof(index))
    if (index) {
      console.log("index", index);
      return accounts[index].id.toString()


    } else {
      return name
    }

  }

 
  return (
    <div >
    <form onSubmit={(e) => handleSubmit(e, editedTrxn)}>
          <div className="form-group">
            {/* <label className="trxn-edit-form__label">Date</label> */}
            <input className="trxn-edit-form__input"
            type="date"
            name="date"
            defaultValue={selectedTrxn.date}
            onChange={e => handleChange({date: e.target.value})}
            ></input>
          </div>
          <div className="form-group">
            {/* <label className="trxn-edit-form__label">From</label> */}
            <select className="trxn-edit-form__input" 
            name='fromAccount' 
            defaultValue={findAccountId(selectedTrxn.fromAccount)}
            onChange={e => handleChange({fromAccount: e.target.value.toString()})}
            >
              {accounts.sort((a,b) => a.num - b.num).map((account, index) => (
                <option key={index} value={account.id}>{account.name}  - {account.subType}</option>
              ))}
            </select>
            </div>
         
          <div className="form-group">
            {/* <label className="trxn-edit-form__label">Amount</label> */}
            <input className="trxn-edit-form__input" 
            type="currency" 
            name='amount' 
            defaultValue={selectedTrxn.amount}
            onChange={e => handleChange({amount: parseFloat(e.target.value)})}
            ></input>
            </div>
            <div className="form-group">
            {/* <label className="trxn-edit-form__label">To</label> */}
            <select className="trxn-edit-form__input" 
            name='toAccount' 
            defaultValue={findAccountId(selectedTrxn.toAccount)}
            onChange={e => handleChange({toAccount: e.target.value.toString()})}
            >
               {accounts.sort((a,b) => a.num - b.num).map((account, index) => (
                <option key={index} value={account.id}>{account.name} - {account.subType}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            {/* <label className="trxn-edit-form__label">Notes</label> */}
            <textarea className="trxn-edit-form__input" 
            name='notes' 
            defaultValue={selectedTrxn.notes}
            onChange={e => handleChange({notes: e.target.value})}
            ></textarea>
            </div>
            <input type="submit"
            className="trxn-edit-form__submit-btn btn btn-success" value="Save"></input>

        </form>

          
    </div>
    )

}

export default TrxnEditInline;
