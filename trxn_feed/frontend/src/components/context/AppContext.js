import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;


const TrxnsContext = React.createContext()
const AccountsContext = React.createContext()
const GoalsContext = React.createContext()
const DashboardContext = React.createContext()


export function useTrxnsContext() {
    return useContext(TrxnsContext)
}

export function useAccountsContext() {
    return useContext(AccountsContext)
}

export function useGoalsContext() {
    return useContext(GoalsContext)
}

export function useDashboardContext() {
    return useContext(DashboardContext)
}


export function AppContext({ children }) {
    //Transactions//

    //State and variables
    const [trxns, setTrxns] = useState([])
    const [selectedTrxnId, setSelectedTrxnId] = useState()

    const selectedTrxn = trxns.find(trxn => trxn.id === selectedTrxnId)

    //Effect
    useEffect(() => {
        getTrxns();
    }, [])

    //functions
    let getTrxns = async () => {
        let response = await fetch('/api/feed/')
        let trxnsData = await response.json()
        // console.log("transactions = ", trxnsData)
        setTrxns(trxnsData)
    }

    let updateTrxns = async (trxn) => {
        fetch(`/api/feed/${trxn.id}/update`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(trxn)
        })
    }

    function handleTrxnSelect(id) {
        setSelectedTrxnId(id)
    }

    function handleTrxnSubmit(newTrxn) {
        updateTrxns(newTrxn);
        console.log('trxn:', newTrxn)
        getTrxns();
    }

    function handleTrxnChange(id, trxn) {
        const newTrxns = [...trxns]
        const index = newTrxns.findIndex(t => t.id === id)
        newTrxns[index] = trxn
        setTrxns(newTrxns)
        setSelectedTrxnId(id)
        console.log(trxns)

    }

    function handleNewTrxn() {
        const maxId = Math.max(...trxns.map(t => t.id));
        const body = {
            "id": maxId +1,
            "date": "2023-01-01",
            "amount": 0,
            "notes": "Notes",
            "toAccount": 1,
            "fromAccount": 1

        };
        
        fetch(`/api/feed/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(body)
        }).then((response) => {
            if (response.ok) {
                console.log('Transaction created successfully');
                // getTrxns();
                window.location = '/transactions/' + maxId+1

            } else {
                console.log('Error creating transaction')
            }
        })
    }

    function handleTrxnDelete(id) {
        fetch(`/api/feed/${id}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'X-CSRFToken': csrftoken
            }
        }).then((response) => {
            if (response.ok) {
                console.log('Transaction deleted')
                window.location = '/transactions'
            } else {
                console.log('Error deleteing transaction')
            }
        })

    }

    // values to get passed into context
    const TrxnsContextValue = {
        trxns,
        selectedTrxn,
        selectedTrxnId,
        setTrxns,
        handleTrxnSelect,
        handleTrxnSubmit,
        handleTrxnChange,
        handleTrxnDelete,
        handleNewTrxn

        
    }

    //Accounts//

    //State and variables
    const [accounts, setAccounts] = useState([])
    const [selectedAccountId, setSelectedAccountId] = useState([])

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
            setSelectedAccountId(undefined)
            getAccounts();
        
    }
    // values to get passed into context

    const AccountsContextValue = {
        accounts,
        setAccounts,
        getAccounts,
        handleAccountSelect,
        handleAccountSubmit,
        selectedAccountId
    }

    //Goals
    //State and variables
    const [goals, setGoals] = useState([])

    //Effect
    useEffect(() => {
        getGoals()

    }, [])

    //functions

    let getGoals = async () => {
        let response = await fetch('/api/goals/')
        let data = await response.json()
        setGoals(data)
        // console.log(data)
    }


   // values to get passed into context
   const GoalsContextValue = {
    goals,
    setGoals
}

    // Dashboard //
    //state
    const [barData, setBarData] = useState([])

    let getDashboard = async () => {
        let response = await fetch('/api/dashboard')
        let data = await response.json()
        setBarData(data);
    }

    //Use Effect
    
    useEffect(() => {
        getDashboard()
    },[])

    // set values

    const DashboardContextValue = {
        barData,
        setBarData,
    }



    
  return (
      <TrxnsContext.Provider value={TrxnsContextValue}>
        <AccountsContext.Provider value={AccountsContextValue}>
            <GoalsContext.Provider value={GoalsContextValue}>
                <DashboardContext.Provider value={DashboardContextValue}>
                    {children}
                </DashboardContext.Provider>
            </GoalsContext.Provider>
        </AccountsContext.Provider>
      </TrxnsContext.Provider>
  )
}
