import React, { useState } from "react";
import Chart from "react-apexcharts";
import BarChart from "../Charts/BarChart";
// import BarChartData from "../../assets/DashboardData/BarChartData";   
// import { useDashboardsContext } from "../context/DashboardContext";
import { useDashboardContext } from "../context/DashboardContext";




export default function DashboardPage() {

  const { balancesByDate, dateRange, setDateRange } = useDashboardContext();


  function handleDateChange(change) {
    setDateRange({...dateRange, ...change})

  }

 

  return (
    <div className="sidebar-margin">
        <form >
          <label>Start Date</label>
          <input type="date" name="startDate" onChange={(e) => handleDateChange({startDate: e.target.value})} value={dateRange.startDate}></input>
          <br/>
          <label>End Date:</label>

          <input type="date" name="endDate" onChange={(e) => handleDateChange({endDate: e.target.value})} value={dateRange.endDate}></input>
          <br/>
          <input type="submit" value="Submit"></input>

        </form>

        {/* <div>{JSON.stringify(balancesByDate)}</div> */}
        <BarChart/>
       
      </div>
  )
}
