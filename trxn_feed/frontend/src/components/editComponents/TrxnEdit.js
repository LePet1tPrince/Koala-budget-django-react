import React, { useState, useEffect, useContext } from 'react';
import { useTrxnsContext } from '../context/AppContext';



function TrxnEdit({ match }) {

  const { trxns, selectedTrxn, selectedTrxnId, handleTrxnSelect } = useTrxnsContext()

  useEffect(() => {
    handleTrxnSelect(parseInt(match.params.id))

  },[])

  // const selectedTrxn = trxns.find(trxn => trxn.id === selectedTrxnId)




    // function handleChange(e) {
    //   setPost({ [e.target.name]: e.target.value});
    //   console.log(post)
    // }

    // let handleSubmit = async (e) => {
    //   e.preventDefault();
    //   console.log(e);




  return (
    <div className="sidebar-margin">
    {selectedTrxn &&
      
      <div className="border border-primary w-75 h-75vh m-5">
        <form>
            <label className="trxn-edit-form__label">Date</label>
            <input className="trxn-edit-form__input"
            type="date"
            name="date"
            defaultValue={selectedTrxn.date}
            ></input>

            <label className="trxn-edit-form__label">Category</label>
            <input className="trxn-edit-form__input" 
            type="text" 
            name='category' 
            defaultValue={selectedTrxn.category}>
            </input>

            <label className="trxn-edit-form__label">Account</label>
            <input className="trxn-edit-form__input" 
            type="text" 
            name='account' 
            defaultValue={selectedTrxn.account}>
            </input>

            <label className="trxn-edit-form__label">Amount</label>
            <input className="trxn-edit-form__input" 
            type="currency" 
            name='amount' 
            defaultValue={selectedTrxn.amount}>
            </input>

            <label className="trxn-edit-form__label">Notes</label>
            <textarea className="trxn-edit-form__input" 
            name='notes' 
            defaultValue={selectedTrxn.notes}>
            </textarea>
            
            <input type="submit"
            className="trxn-edit-form__submit-btn" value="Submit"></input>

        </form>
      </div>
          }
    </div>
  )

}

export default TrxnEdit


{/* <div className="sidebar-margin">
      <div className="border border-primary w-75 h-75vh m-5">
      <div className="d-flex flex-row bd-highlight mb-3 flex-wrap">
      <form onSubmit={handleSubmit}>
        <div className="p-2 bd-highlight">
          <label>
            Date
          </label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} name='date'></input>
        </div>

        <div className="p-2 bd-highlight">
          <label>
            Account
          </label>
          <select onChange={(e) => setAccount(Number(e.target.value))}>
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
          <select onChange={(e) => setCategory(Number(e.target.value))}>
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

      </div> */}