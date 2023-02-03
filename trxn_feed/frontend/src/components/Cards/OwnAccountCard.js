import React from 'react';
import { Link } from 'react-router-dom';


export default function OwnAccountCard(props) {
    const { account,
        setSelectedAccountName
        } = props;

  return (
    // <Link to={`/transactions/${id}`}>
    <button onClick={() => setSelectedAccountName(account.name)} className="btn-remove-styling m-3">

    <div class="card account-card bg-light">
        <div class="card-body">
            <h5 class="card-title">{account.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{account.subType}</h6>
            <h6 class="card-body">Balance:</h6>
            
        </div>
        </div>
    </button>
    // </Link>
  )
}
