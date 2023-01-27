import React, { useState, useEffect } from 'react';
import GoalTable from '../Tables/GoalTable';
import { apiEndPoint } from '../../Assets/apiEndPoint';

const GoalsPage = () => {

    let [goals, setGoals] = useState([])

    useEffect(() => {
        getGoals()

    }, [])

    let getGoals = async () => {
        let response = await fetch(`${apiEndPoint}/api/goals/`)
        let data = await response.json()
        setGoals(data)
        console.log(data)
    }

    const Headers = ['Name','Goal','Due Date','Current Raised'];

  return (
    <div className="sidebar-margin">
      <h1>Goals</h1>
        <div className='feed-list'>
            <div className="p-5 m-5">
            <GoalTable header={Headers} data={goals} />

        
</div>
        </div>
    </div>
  )
}

export default GoalsPage