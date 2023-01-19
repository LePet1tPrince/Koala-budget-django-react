import React, { useState, useEffect } from 'react';
import AccTable from '../Tables/AccTable';
import Plus from '../../Assets/Images/plus.svg';
import { useAccountsContext } from '../context/AccountContext';





const AccountPage = () => {
    const { accounts,  handleAccountAdd, ownAccounts, flowAccounts } = useAccountsContext();

    const Headers = ['Account Number','Account Name','Account Type','Account Sub-Type']



  return (
    <div>
        <div className='feed-list sidebar-margin'>
          <div className="d-flex justify-content-between">
            <h1>Accounts</h1>
            <button className="btn btn-info" onClick={() => handleAccountAdd()}>
              <img src= { Plus }  className="img-fluid" width="70" height="50" alt="..."/>
            </button>

          </div>
          <div className="p-5 m-5">
            <h2>Owner Accounts</h2>
            <AccTable header={Headers}
            data={ownAccounts}
          
            />

                
          </div>
          <div className="p-5 m-5">
            <h2>Spend Accounts</h2>
            <AccTable header={Headers} 
            data={flowAccounts}
            />
        
          </div>
        </div>
    </div>
  )
}

export default AccountPage