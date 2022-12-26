
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



export default BarChartData