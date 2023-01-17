import React, { useState, useEffect, useContext } from 'react';
import csrftoken from '../../assets/csrftoken';
import { v4 as uuidv4 } from 'uuid' ;
import { useAccountsContext } from './AccountContext';

const BudgetsContext = React.createContext()

export function useBudgetContext() {
    return useContext(BudgetsContext)
}

export function BudgetContext({ children }) {
    const [budget, setBudget] = useState([])
    const [budgetByYear, setBudgetByYear] = useState()
    const [editedBudget, setEditedBudget] = useState()
    const [ selectedCategoryId, setSelectedCategoryId ] = useState()

    const { accounts } = useAccountsContext();
    


    
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

    function getMonthFromString(mon) {
      const monthNum = new Date(Date.parse(mon +" 1, 2023")).getMonth()+1
      return String("0" + monthNum).slice(-2);
    }

    function handleBudgetAdd(e, budget, accounts) {
      const maxId = Math.max(...budget.map(b => b.id));
      const newMonth = e.target.name.split('-')[1]
      const newCategory = e.target.name.split('-')[2]
      const categoryId = accounts.find(account => account.name === newCategory).id
      const year = budget[0].year
      console.log("month", getMonthFromString(newMonth))
      const body = {
        "id": String(year) + getMonthFromString(newMonth) + String("0" + categoryId).slice(-2),
        "month": newMonth,
        "year": year,
        "target": 0,
        "category": categoryId

      }
        
      fetch('/api/budget/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(body)
      }).then((response) => {
        if (response.ok) {
          console.log(`New account created for ${body.category} in ${body.month} ${body.year}`)
          getBudget();
          getBudgetByYear(body.year);
          console.log(typeof(body.id))
          setSelectedCategoryId(body.id);


        } else {
          console.log('error creating new budget')
        }
      })
    }


    function findTargetInactive(budgetByYear, month, category, accounts) {
      for (let i=0; i < budgetByYear.length; i++) {
        if (budgetByYear[i].month === month && budgetByYear[i].category === category) {
          return `$${budgetByYear[i].target}`;
          
        }
  
      }
      return <input className="checkbox" type="checkbox" name={`checkbox-${month}-${category}`} onClick={e => handleBudgetAdd(e, budgetByYear, accounts)}></input>
  
    }

    function findTargetActive(budgetByYear, month, category, accounts) {
      for (let i=0; i < budgetByYear.length; i++) {
        if (budgetByYear[i].month === month && budgetByYear[i].category === category) {
          return budgetByYear[i].target;
          
        }
  
      }
      return null
  
    }

    function findBudgetId(budgetByYear, month, category) {
      for (let i=0; i < budgetByYear.length; i++) {
        if (budgetByYear[i].month === month && budgetByYear[i].category === category) {
          return budgetByYear[i].id;
        }
  
      }
      return 0
  
    }

    function handleNewBudget(body, id) {
      fetch('/api/budget/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(body)
      }).then((response) => {
        if (response.ok) {
          console.log(`New account created for ${body.category} in ${body.month} ${body.year}`)
          getBudget();
          getBudgetByYear(body.year);
          console.log(typeof(body.id))
          setSelectedCategoryId(body.id);


        } else {
          console.log('error creating new budget')
        }
      })
    }

    function handleBudgetUpdate(newBudget) {
      fetch(`/api/budget/${newBudget.id}/update`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type':  'application/json',
          'X-CSRFToken': csrftoken
        },
        body:JSON.stringify(newBudget)

      }).then((response) => {
        if (response.ok){
          console.log(`Budget updated for ${newBudget.category} in ${newBudget.month} ${newBudget.year} to ${newBudget.target}`)
        } else {
          console.log('error updated budget')
        }
      })

    }


    function handleBudgetChange(e, year, id, changes) {
      // const maxId = Math.max(...budget.map(b => b.id));
      // const newMonth = e.target.name.split('-')[1]
      // const newCategory = e.target.name.split('-')[2]
      // const categoryId = accounts.find(account => account.name === newCategory).id
      // console.log("id", id)
      if (id === 0) {
        // const body = {
        //   "id": maxId+1,
        //   "month": newMonth,
        //   "year": year,
        //   "target": e.target.value,
        //   "category": categoryId

        // }
        // handleNewBudget(body,id)

        
  
      } else {
        const newBudget = [...budget]
        const index = newBudget.findIndex(b => b.id === id)
        newBudget[index] = [{...newBudget[index], target: e.target.value}]
        handleBudgetUpdate(newBudget[index][0])

  
      }
     
  
    }



    function handleBudgetSubmit(year) {
      // window.location.reload(false);
      setSelectedCategoryId(undefined)
      getBudget()
      // console.log("id is", year)
      getBudgetByYear(year)
      // setBudget(budget)
      
    }

    function handleBudgetDelete(arg) {

    }

      
  

    const budgetContextValue = {
        budget,
        setBudget,
        getBudget,
        editedBudget,
        setEditedBudget,
        getBudgetByYear,
        budgetByYear,
        setBudgetByYear,
        handleBudgetChange,
        handleBudgetDelete,
        handleBudgetSubmit,
        findTargetActive,
        findTargetInactive,
        findBudgetId,
        selectedCategoryId,
        setSelectedCategoryId

    }
  return (
    <BudgetsContext.Provider value={budgetContextValue}>
        {children}
    </BudgetsContext.Provider>
  )
}
