import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../Assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;
import { apiEndPoint } from '../../Assets/apiEndPoint';


const DashboardsContext = React.createContext()

export function useDashboardContext() {
    return useContext(DashboardsContext)
}

export function DashboardContext({ children }) {

  // Dashboard //
    //state
    const [balancesByDate, setBalancesByDate] = useState()
    const [dateRange, setDateRange] = useState({startDate: '2023-01-01', endDate: '2023-01-30'})

    let getDashboard = async () => {
        let response = await fetch(`${apiEndPoint}/api/dashboard/${dateRange.startDate}_${dateRange.endDate}`)
        let data = await response.json()
        setBalancesByDate(data);
        console.log(data)
    }

    //Use Effect
    useEffect(() => {
      getDashboard();

    },[dateRange])

    // set values


    const DashboardContextValue = {
        balancesByDate,
        dateRange,
        setDateRange
  
     
    }


    
  return (
    <DashboardsContext.Provider value={DashboardContextValue}>
        {children}
    </DashboardsContext.Provider>

  )
}
