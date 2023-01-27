import React, { useState } from 'react';
import { useBudgetContext } from '../context/BudgetContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BudgetTable from '../Tables/BudgetTable';
import { useAccountsContext } from '../context/AccountContext';

export default function BudgetPage() {
  // const [budgetByYear, setBudgetByYear ] = useState()
  const { budget, budgetByYear, setBudgetByYear } = useBudgetContext();
  const { accounts, flowAccounts } = useAccountsContext();

  const flowAccountsIn = flowAccounts.filter(acc => acc.subType === "Income")
  const flowAccountsOut = flowAccounts.filter(acc => acc.subType === "Expense")



  const years = [...new Set(budget.map(item => item.year))].sort()

  function handleYearSelect(yr) {
    const newBudget = budget.filter(item => item.year === yr)
    setBudgetByYear(newBudget)


  }

  
  

  return (
    <div className="sidebar-margin">
      <h1>Budget</h1>

      <div className="justify-items-accross">
        {years.map((item) => (
          <button
          className="btn btn-info m-3" 
          key={item}
          onClick={() => handleYearSelect(item)}
          >{item}</button>
          ))}
          {/* {[...new Set(budget.map(item => item.year))].sort()} */}
      </div>
      <br/>
      {budgetByYear && <div className="w-75">
        <h2>
      {budgetByYear[0].year}
      {/* {JSON.stringify(budgetByYear)} */}

        </h2>

      <h1>
        Income
      </h1>
      <BudgetTable  accounts={flowAccountsIn} />

      <h1>
        Expenses
      </h1>
      <BudgetTable accounts={flowAccountsOut} />

      </div>}


    </div>
  )
}
