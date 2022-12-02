import React from 'react'
import { Link } from 'react-router-dom'

const TrxnFeed = ({ trxn, index }) => {
  return (
      <tr key={index}>
            <th scope="row">{trxn.date}</th>
            <th>{trxn.amount}</th>
            <th>{trxn.account}</th>
            <th>{trxn.category}</th>
            <th>{trxn.notes}</th>
            <th>
                <Link to={`/trxn/${trxn.id}`}>
                    <button>See More</button>
                </Link></th>

        </tr>
  )
}

export default TrxnFeed