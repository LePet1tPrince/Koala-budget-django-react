import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const TrxnFeed = ({ trxn, index, accounts }) => {

    
  return (
      <tr key={index}>
            <th scope="row">{trxn.date}</th>
            <th>{trxn.amount}</th>
            {/* <th>{Accounts[trxn.account - 1].name}</th> */}
            <th>{accounts[trxn.account-1].name}</th>
            {/* <th>{trxn.account}</th> */}
            {/* <th>{trxn.category}</th> */}
            <th>{accounts[trxn.category-1].name}</th>
            {/* <th>{JSON.stringify(Accounts[trxn.category-1].name)}</th> */}
            <th>{trxn.notes}</th>
            <th>
                <Link to={`/trxn/${trxn.id}`}>
                    <button>Edit Transaction</button>
                </Link></th>
        </tr>
  )
}

export default TrxnFeed