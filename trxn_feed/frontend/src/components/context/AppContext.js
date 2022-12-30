import React, { useState, useEffect, useContext } from 'react'

const TrxnsContext = React.createContext()
const AccountsContext = React.createContext()

export function useTrxns() {
    return useContext(TrxnsContext)
}

export function useAccounts() {
    return useContext(AccountsContext)
}


export function AppContext({ children }) {
    const [trxns, setTrxns] = useState([])
    const [accounts, setAccounts] = useState([])



    useEffect(() => {
        getTrxns();
        getAccounts();
    }, [])

    let getTrxns = async () => {
        let response = await fetch('/api/feed/')
        let trxnsData = await response.json()
        console.log("transactions = ", trxnsData)
        setTrxns(trxnsData)
    }

    // get accounts list
    let getAccounts = async () => {
        let response = await fetch('/api/accounts/')
        let accdata = await response.json()
        setAccounts(accdata)
        console.log("accounts =", accdata)
    }

    const TrxnsContextValue = {
        trxns,
        accounts
    }
  return (
      <TrxnsContext.Provider value={trxns}>
        <AccountsContext.Provider value={accounts}>
            {children}
        </AccountsContext.Provider>
      </TrxnsContext.Provider>
  )
}
