import React, { useState, useEffect } from 'react';
import GoalFeed from '../components/GoalFeed';


const Goals = () => {

    let [goals, setGoals] = useState([])

    useEffect(() => {
        getGoals()

    }, [])

    let getGoals = async () => {
        let response = await fetch('/api/goals/')
        let data = await response.json()
        setGoals(data)
        console.log(data)
    }
  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
            <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Goal</th>
      <th scope="col">Due Date</th>
      <th scope="col">Current Raised</th>
    </tr>
  </thead>
  <tbody>
    {goals.map((goal, index) => (
      
      <GoalFeed key={index} goal={goal} index={index} />
      

            ))}
    
  </tbody>
</table>
        
</div>
        </div>
    </div>
  )
}

export default Goals