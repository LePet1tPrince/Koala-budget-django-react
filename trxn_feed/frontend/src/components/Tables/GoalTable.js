import React from 'react'
import { Link } from 'react-router-dom';


const GoalTable = ({ header, data, lookup }) => {
  return (
    <div className="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    {header.map((title, index) => (
                        <th scope="col" key={index}>{title}</th>
                    ))}

                </tr>
            </thead>
            <tbody>
                {data.map((goal, index) => (
                
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

                        ))}
                
            </tbody>
            </table>
    </div>
  )
}

export default GoalTable