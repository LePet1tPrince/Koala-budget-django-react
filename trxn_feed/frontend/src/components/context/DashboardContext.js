import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;


const DashboardsContext = React.createContext()

export function useDashboardContext() {
    return useContext(DashboardsContext)
}

export function DashboardContext({ children }) {

  // Dashboard //
    //state
    const [barData, setBarData] = useState([])

    let getDashboard = async () => {
        let response = await fetch('/api/dashboard')
        let data = await response.json()
        setBarData(data);
    }

    //Use Effect
    
    useEffect(() => {
        getDashboard()
    },[])

    // set values

    const DashboardContextValue = {
        barData,
        setBarData,
    }

  return (
    <DashboardsContext.Provider value={DashboardContextValue}>
        {children}
    </DashboardsContext.Provider>

  )
}
