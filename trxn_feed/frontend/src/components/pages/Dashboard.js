import React, { useState } from "react";
import Chart from "react-apexcharts";
// import BarChartData from "../../assets/DashboardData/BarChartData";   
// import { useDashboardsContext } from "../context/DashboardContext";
import { useDashboardContext } from "../context/DashboardContext";


const BarChartData = {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
        // categories: data.category
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
  },
  series: [
    {
      name: "amount",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    },
    {
      name: "budget",
      data: [33, 43, 43, 53, 43, 63, 73, 93]
    }
  ]
};

export default function Dashboard() {

  const { barData } = useDashboardContext();

  const BarChartData = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: barData.category
      }
    },
    series: [
      {
        name: "amount",
        data: barData.amount
      },
      {
        name: "budget",
        data: barData.amount
      }
    ]
  };

  

  return (
    <div className="sidebar-margin">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={BarChartData.options}
              series={BarChartData.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
  )
}
