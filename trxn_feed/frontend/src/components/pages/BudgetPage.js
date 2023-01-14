import React, { useState } from 'react';
import { useBudgetContext } from '../context/BudgetContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BudgetTable from '../tables/BudgetTable';

export default function BudgetPage() {
  const [budgetByYear, setBudgetByYear ] = useState({})
  const { budget } = useBudgetContext();

  const years = [...new Set(budget.map(item => item.year))].sort()

  function handleYearSelect(yr) {
    const newBudget = budget.filter(item => item.year === yr)
    setBudgetByYear(newBudget)


  }

  
  

  return (
    <div className="sidebar-margin">

      <div className="justify-items-accross">
        {years.map((item) => (
          <button
          className="btn btn-info m-3" 
          key={item}
          onClick={() => handleYearSelect(item)}
          >{item}</button>
          ))}
      </div>
      <br/>
      <div className="w-75">


      {budgetByYear && <BudgetTable budget={budgetByYear} />}
      </div>


    </div>
  )
}
