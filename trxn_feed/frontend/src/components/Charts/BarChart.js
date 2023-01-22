import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
// import BarChartData from "../../assets/DashboardData/BarChartData";   
// import { useDashboardsContext } from "../context/DashboardContext";
import { useDashboardContext } from "../context/DashboardContext";
import { useAccountsContext } from "../context/AccountContext";


const BarChartData = {
  options: {
    chart: {
      type: 'bar',
      id: "basic-bar"
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4
      }
    }

  },
  series: [
    {
      data: "This data"
}]};

export default function BarChart() {

  const { balancesByDate } = useDashboardContext();
  const { accounts, flowAccounts } = useAccountsContext();

  const [chartData, setChartData] = useState();




  
  const incomeAccounts = accounts.filter(function (account) {
    return account.subType === "Income"
})

  const incomeNames = incomeAccounts.map(acc => acc.name)


  useEffect(() => {
    // const dataList = []
    const dataTemplate =  {
      x: "income name3",
      y: 30,
      fillColor: '#948087',
      goals: [{
          name: 'Budget',
          value: 33,
          strokeColor: '#775DD0'
        }]  
    };
    incomeAccounts.map(acc => {
      let newData = {...dataTemplate, x: acc.name, y: 55}
      if(chartData.length === 0) {
         setChartData([newData])
       }else{
          setChartData([...chartData, newData])
       }
       console.log("This thing is", JSON.stringify(chartData))
   })
  },[])

 
  

  return (
    <div className="sidebar-margin">
      <div className="row">
          <div className="mixed-chart">
            { balancesByDate && <Chart
              options={BarChartData.options}
              // series={BarChartData.series}
              series={balancesByDate}
              type="bar"
              width="500"
            />}
          </div>
        </div>
      </div>
  )
}
