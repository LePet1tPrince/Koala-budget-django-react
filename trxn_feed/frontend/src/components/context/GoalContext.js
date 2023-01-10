import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;


const GoalsContext = React.createContext()


export function useGoalsContext() {
  return useContext(GoalsContext)
}

export function GoalContext({ children }) {

    //Goals
    //State and variables
    const [goals, setGoals] = useState([])

    //Effect
    useEffect(() => {
        getGoals()

    }, [])

    //functions

    let getGoals = async () => {
        let response = await fetch('/api/goals/')
        let data = await response.json()
        setGoals(data)
        // console.log(data)
    }


   // values to get passed into context
   const GoalsContextValue = {
    goals,
    setGoals
}
  return (
    <GoalsContext.Provider value={GoalsContextValue}>
      { children }
    </GoalsContext.Provider>

  )
}
