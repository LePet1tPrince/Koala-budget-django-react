import React, { useState, useEffect } from 'react';
import { useBudgetContext } from '../context/BudgetContext';
import { useParams } from 'react-router-dom';
import { useAccountsContext } from '../context/AccountContext';
import pencil from '../../Assets/Images/pencil-icon.png';


export default function BudgetTable({ accounts }) {
  const { handleBudgetSubmit,
    budgetByYear,
    handleBudgetDelete, 
    handleBudgetChange, 
    editedBudget, 
    setEditedBudget, 
    selectedCategoryId, 
    setSelectedCategoryId, 
    findTargetActive,
    findTargetInactive, 
    findBudgetId } = useBudgetContext();
  
  const monthHeaders = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const accountHeaders = [...new Set(accounts.map(acc => acc.name))]

  useEffect(() => {
    setEditedBudget(budgetByYear)

  }, [budgetByYear])

  useEffect(() => {
    setSelectedCategoryId(undefined)
    
  },[budgetByYear])


  function handleCategorySelect(id) {
    setSelectedCategoryId(id)


  }
  

  return (
    <div className="sidebar-margin">

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th></th>
            {monthHeaders.map((month) => (
              <th key={month}>{month}</th>
            ))}
            <th></th>

          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.name}</td>
              {monthHeaders.map(month => {
                if (account.id === selectedCategoryId) {
                  const activeBudgetIds =  [...new Set(budgetByYear.map(bud => bud.id))]
                  return <td key={month}>
                    <input 
                    className={`budget-input-field rounded-2 border-0 pl-2`}
                    type="none"
                    name={`input-${month}-${account.name}`}
                    defaultValue={findTargetActive(budgetByYear, month, account.name, accounts)}
                    onChange={e => handleBudgetChange(e, budgetByYear[0].year, findBudgetId(budgetByYear, month, account.name), {target: e.target.value})}
                    disabled={activeBudgetIds.indexOf(findBudgetId(budgetByYear, month, account.name)) === -1 ? true : false}
                    >
                    </input>
                    </td>


                } else {
                  return <td 
                  key={month}
                  className="p-3"
                  >{findTargetInactive(budgetByYear, month, account.name, accounts)}</td>


                }

              }

              )}
              {account.id !== selectedCategoryId &&
                <td>
                <button className="btn btn-info" onClick={() => handleCategorySelect(account.id)}>
                <img src={ pencil } width="20" height="20" alt="Edit Transaction"/>
                </button>
                </td>
                
              }

              {account.id === selectedCategoryId &&
                <td>
                  <span className="d-flex inline">
                    <button className="btn btn-success mx-2" onClick={() => handleBudgetSubmit(budgetByYear[0].year)}>
                        Save
                    </button>
                    {/* <button className="btn btn-primary mx-2" onClick={() => handleCategorySelect(undefined)}>
                        Cancel
                    </button> */}
                    {/* <button className="btn btn-danger mx-2" onClick={() => handleBudgetDelete(selectedCategoryId)}>
                        Delete
                    </button> */}
                  </span>
                </td>
                
              }
              
              </tr>
          ))}
        </tbody>
      </table>



     
    </div>
  )
}
