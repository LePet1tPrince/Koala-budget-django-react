import React, { Component } from "react";
import Chart from "react-apexcharts";
import BarChartData from "../Assets/DashboardData/BarChartData";   

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: [
          {...BarChartData.options.xaxis}
        ]
      },
      series: [
          {...BarChartData.options.series}
      ]
    };
  }

  render() {
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
    );
  }
}

export default Dashboard;