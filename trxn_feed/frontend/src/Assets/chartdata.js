import React, { Component } from "react";
import Chart from "react-apexcharts";

async function getFeed(url=''){

    const response = await fetch(url)
    let data = response.json()
    return data.map(function(item) {
        return item.category;
});
}
getFeed('/api/feed/')
.then((data) => {
    console.log(data);
})
// var arr = data.map(function(item) {
//     return item.category;
// });
// console.log(arr)
// const response = fetch('/api/feed/')
// const data = response.json()
// console.log(data)



const chartdata = {
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
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };



export default chartdata