import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;

const AccountsContext = React.createContext()

export function useAccountsContext() {
    return useContext(AccountsContext)
}

export function AccountContext({ children }) {

     //Accounts//

    //State and variables
    const [accounts, setAccounts] = useState([])
    const [selectedAccountId, setSelectedAccountId] = useState([])
    const accountTypeOptions = ['Own', 'Flow','Save']
    const accountSubTypeOptions = ['Asset', 'Liability','Income', 'Expense']

    //Effect
    useEffect(() => {
        getAccounts();
    }, [])

    // functions
    let getAccounts = async () => {
        let response = await fetch('/api/accounts/')
        let accdata = await response.json()
        setAccounts(accdata)
        // console.log("accounts =", accdata)
    }

    let updateAccount = async (account) => {
        fetch(`/api/accounts/${account.id}/update`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(account)
        })

    }

    function handleAccountSelect(id) {
        setSelectedAccountId(id)
        console.log('Selected Account', id)
    }

    function handleAccountSubmit(newAccount) {
            updateAccount(newAccount)
            console.log('Account:', newAccount)
            getAccounts()
            setSelectedAccountId(undefined)
        
    }

    function handleAccountAdd() {
        const maxId = Math.max(...accounts.map(a => a.id));
        const body = {
            "id": maxId+1,
            "name": "Name",
            "num" : 0,
            "type": "Own",
            "subType": "Asset"

        };
        
        fetch(`/api/accounts/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                console.log('Account created successfully');
                // getTrxns();
                // window.location = '/transactions/' + maxId+1
                handleAccountSelect(maxId+1)

            } else {
                console.log('Error creating transaction')
            }
        })
    }


    function handleAccountDelete(id) {
        fetch(`/api/accounts/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'X-CSRFToken': csrftoken
            }
        }).then((response) => {
            if (response.ok) {
                console.log('account deleted')
                window.location = '/accounts'
            } else {
                console.log('Error deleting account')
            }
        })

    }
    // values to get passed into context

    const AccountsContextValue = {
        accounts,
        accountSubTypeOptions,
        accountTypeOptions,
        setAccounts,
        getAccounts,
        handleAccountSelect,
        handleAccountSubmit,
        handleAccountAdd,
        handleAccountDelete,
        selectedAccountId
    }

  return (
    <AccountsContext.Provider value={AccountsContextValue}>
        {children}
    </AccountsContext.Provider>

  )
}
