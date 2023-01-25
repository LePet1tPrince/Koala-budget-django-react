import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
// import BarChartData from "../../assets/DashboardData/BarChartData";   
// import { useDashboardsContext } from "../context/DashboardContext";
import { useDashboardContext } from "../context/DashboardContext";
import { useAccountsContext } from "../context/AccountContext";




export default function BarChart(props) {

  const { barChartOptions, data } = props

  return (
    <div className="sidebar-margin">
      <div className="row">
          <div className="mixed-chart">
            <Chart
              options={barChartOptions}
              series={data}
              type="bar"
              width="500"
            />

          </div>
        </div>
      </div>
  )
}
