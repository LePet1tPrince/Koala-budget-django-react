import React from 'react'
import { Link } from 'react-router-dom'

const GoalFeed = ({ goal, index}) => {
  return (
    <tr key={index}>
            <th scope="row">{goal.name}</th>
            <th>{goal.goal}</th>
            <th>{goal.date}</th>
            <th>{goal.raised}</th>
            <th>
                <Link to={`/goals/${goal.id}`}>
                    <button>Edit Goal</button>
                </Link></th>
        </tr>
  )
}

export default GoalFeed