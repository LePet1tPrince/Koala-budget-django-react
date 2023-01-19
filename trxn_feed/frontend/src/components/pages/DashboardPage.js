import React, { useState } from "react";
import Chart from "react-apexcharts";
// import BarChartData from "../../assets/DashboardData/BarChartData";   
// import { useDashboardsContext } from "../context/DashboardContext";
import { useDashboardContext } from "../context/DashboardContext";




export default function DashboardPage() {

  const { setDates } = useDashboardContext();

  return (
    <div className="sidebar-margin">
        <form>
          <label>Start Date</label>
          <input type="date" name="startDate" ></input>
          <br/>
          <label>End Date:</label>

          <input type="date" name="endDate"></input>
          <br/>
          <input type="submit" value="Submit"></input>

        </form>
       
      </div>
  )
}
