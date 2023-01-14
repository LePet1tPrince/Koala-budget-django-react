import React from 'react';
import { useBudgetContext } from '../context/BudgetContext';
import { useParams } from 'react-router-dom';
import { useAccountsContext } from '../context/AccountContext';

export default function BudgetTable({ budget }) {
  // let { yr } = useParams();
  const { accounts } = useAccountsContext();
  // const { budget, BudgetByYear, getBudgetByYear } = useBudgetContext();

  const monthHeaders = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const accountHeaders = [...new Set(accounts.map(acc => acc.name))]
  // const budgetByCategory = [...new Set(budget.map(item => item.category))]

  // const budgetByCategory = budget.reduce((acc, obj) => {
  //   const month = obj.month;
  //   const category = obj.category;
  //   const target = obj.target;

  //   if (!acc[category]) {
  //     acc[category] = {};
  //   }
  //   acc[category][month] = target;

  //   return acc;
  // }, {});

  // const categories = Object.keys(budgetByCategory);

  // const months = budget
  //   .map(obj => obj.month)
  //   .filter((month,index,self) => self.indexOf(month) === index);
  function findTarget(data, month, category) {
    for (let i=0; i < data.length; i++) {
      if (data[i].month === month && data[i].category === category) {
        return data[i].target;
      }

    }
    // const match = data.find(d => d.month === month && d.category === category);
    // if (match) {
    //     return match.target
    // } else {
    //   return 
    return 0

  }
  function budgetExists(month, name, budget) {
    return budget.month === month
    // if (budget.filter(obj => obj.month === month) !== null) {
    //   return (budget.find(obj => obj.month === month))
    // } else {
    //   return ("Hi");
    // }
    // return budget.filter(obj => obj.month === month)
  }

  return (
    <div className="sidebar-margin">
      <h1>{budget[0].year}</h1>


      

      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th></th>
            {monthHeaders.map((month) => (
              <th key={month}>{month}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.name}</td>
              {monthHeaders.map(month => (
                <td key={month}>{findTarget(budget, month, account.name)}</td>
              ))}
              </tr>
          ))}
        </tbody>
      </table>



     
    </div>
  )
}
