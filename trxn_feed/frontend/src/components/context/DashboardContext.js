import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../Assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;


const DashboardsContext = React.createContext()

export function useDashboardContext() {
    return useContext(DashboardsContext)
}

export function DashboardContext({ children }) {

  // Dashboard //
    //state
    const [barData, setBarData] = useState([])
    const [dateRange, setDateRange] = useState()

    let getDashboard = async (dates) => {
        let response = await fetch(`/api/dashboard/${dates[0]}_${dates[1]}`)
        let data = await response.json()
        setBarData(data);
    }

    //Use Effect
    
    useEffect(() => {
        getDashboard()
    },[])

    useEffect(() => {
      getDashboard(dateRange)

    },[dateRange])

    // set values

    function setDates(start_date, end_date) {
      getDashboard([start_date, end_date])
    }

    function handleDateRangeSelect() {
      
    }

    const DashboardContextValue = {
        barData,
        setBarData,
        setDates,
        dateRange
    }


    
  return (
    <DashboardsContext.Provider value={DashboardContextValue}>
        {children}
    </DashboardsContext.Provider>

  )
}
