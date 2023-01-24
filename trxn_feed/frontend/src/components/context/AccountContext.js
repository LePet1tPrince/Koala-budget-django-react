import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../Assets/csrftoken'
import { apiEndPoint } from '../../Assets/apiEndPoint';

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

    const ownAccounts = accounts.filter(function (account) {
        return account.type === "Own"
    }).sort((a, b) => a.num - b.num);

    const flowAccounts = accounts.filter(function (account) {
        return account.type === "Flow"
    }).sort((a, b) => a.num - b.num);

    const saveAccounts = accounts.filter(function (account) {
        return account.type === "Save"
    })

    //Effect
    useEffect(() => {
        getAccounts();
    }, [])

    // functions
    let getAccounts = async () => {
        let response = await fetch(`${apiEndPoint}/api/accounts/`)
        let accdata = await response.json()
        setAccounts(accdata)
        // console.log("accounts =", accdata)
    }

    let updateAccount = async (account) => {
        fetch(`${apiEndPoint}/api/accounts/${account.id}/update`, {
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
        
        fetch(`${apiEndPoint}/api/accounts/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                console.log('Account created successfully', maxId+1 );
                getAccounts();
                handleAccountSelect(maxId+1)

            } else {
                console.log('Error creating transaction')
            }
        })
    }


    function handleAccountDelete(id) {
        fetch(`${apiEndPoint}/api/accounts/${id}/delete`, {
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
        ownAccounts,
        flowAccounts,
        saveAccounts,
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
