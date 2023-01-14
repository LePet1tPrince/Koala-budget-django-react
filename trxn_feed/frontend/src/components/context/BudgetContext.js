import React, { useState, useEffect, useContext } from 'react';
import csrftoken from '../../assets/csrftoken';
import { v4 as uuidv4 } from 'uuid' ;

const BudgetsContext = React.createContext()

export function useBudgetContext() {
    return useContext(BudgetsContext)
}

export function BudgetContext({ children }) {
    const [budget, setBudget] = useState([])
    const [budgetByYear, setBudgetByYear] = useState([])


    
    let getBudget = async () => {
      let response = await fetch('/api/budget/')
      let budgetData = await response.json()
      setBudget(budgetData)
      console.log(budgetData)
    }

    let getBudgetByYear = async (yr) => {
      let response = await fetch(`/api/budget/${yr}`)
      let budgetData = await response.json()
      setBudgetByYear(budgetData)
      console.log(budgetData)
    }

    useEffect(() => {
      getBudget()
    }, [])


    const budgetContextValue = {
        budget,
        setBudget,
        getBudget,
        getBudgetByYear,
        budgetByYear

    }
  return (
    <BudgetsContext.Provider value={budgetContextValue}>
        {children}
    </BudgetsContext.Provider>
  )
}
