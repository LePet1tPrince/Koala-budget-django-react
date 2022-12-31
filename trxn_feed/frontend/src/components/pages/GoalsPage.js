import React, { useState, useEffect } from 'react';
import GoalTable from '../tables/GoalTable';


const GoalsPage = () => {

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

    const Headers = ['Name','Goal','Due Date','Current Raised'];

  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
            <GoalTable header={Headers} data={goals} />

        
</div>
        </div>
    </div>
  )
}

export default GoalsPage