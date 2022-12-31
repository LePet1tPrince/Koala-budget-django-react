import React, { useState, useEffect, useContext } from 'react'

const TrxnsContext = React.createContext()
const AccountsContext = React.createContext()
const GoalsContext = React.createContext()


export function useTrxnsContext() {
    return useContext(TrxnsContext)
}

export function useAccountsContext() {
    return useContext(AccountsContext)
}

export function useGoalsContext() {
    return useContext(GoalsContext)
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

    function handleTrxnSelect(id) {
        setSelectedTrxnId(id)
        console.log("selected id is", selectedTrxnId)
    }

    // values to get passed into context
    const TrxnsContextValue = {
        trxns,
        handleTrxnSelect,
        selectedTrxn,
        setTrxns
        
    }

    //Accounts//

    //State and variables
    const [accounts, setAccounts] = useState([])

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

    // values to get passed into context

    const AccountsContextValue = {
        accounts,
        setAccounts
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
    


    
  return (
      <TrxnsContext.Provider value={TrxnsContextValue}>
        <AccountsContext.Provider value={AccountsContextValue}>
            <GoalsContext.Provider value={GoalsContextValue}>
                {children}
            </GoalsContext.Provider>
        </AccountsContext.Provider>
      </TrxnsContext.Provider>
  )
}
