import React, { useState, useEffect, useContext } from 'react'
import csrftoken from '../../Assets/csrftoken'
import { v4 as uuidv4 } from 'uuid' ;
import { apiEndPoint } from '../../Assets/apiEndPoint';


const TrxnsContext = React.createContext()


export function useTrxnsContext() {
    return useContext(TrxnsContext)
}



export function TrxnContext({ children }) {
    //Transactions//

    //State and variables
    const [trxns, setTrxns] = useState([])
    const [filteredTrxns, setFilteredTrxns] = useState([])
    const [selectedTrxnId, setSelectedTrxnId] = useState()

    const selectedTrxn = trxns.find(trxn => trxn.id === selectedTrxnId)

    //Effect
    useEffect(() => {
        getTrxns();
    }, [])

    //functions
    let getTrxns = async () => {
        let response = await fetch(`${apiEndPoint}/api/trxns/`)
        let trxnsData = await response.json()
        // console.log("transactions = ", trxnsData)
        setTrxns(trxnsData)
    }

    // let getFilteredTrxns = async (id) => {
    //     let response = await fetch(`${apiEndPoint}/api/trxns/${id}`)
    //     let trxnsData = await response.json()
    //     // console.log("transactions = ", trxnsData)
    //     setTrxns(trxnsData)
    // }

    let updateTrxns = async (trxn) => {
        fetch(`${apiEndPoint}/api/trxns/${trxn.id}/update`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(trxn)
        }).then ((response) => {
            if (response.ok) {
                getTrxns();
                alert('Transaction successfully updated')

            }
            else {
                alert('there was an error saving the transaction')
                alert(JSON.stringify(trxn))
            }
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
            "toAccount": 3,
            "fromAccount": 2        

        };
        
        fetch(`${apiEndPoint}/api/trxns/`, {
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
                getTrxns();
                window.location = '/transactions/' + String(parseInt(maxId)+1)

            } else {
                console.log('Error creating transaction')
            }
        })
    }

    function handleTrxnDelete(id) {
        fetch(`${apiEndPoint}/api/trxns/${id}/delete`, {
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
        filteredTrxns,
        selectedTrxn,
        selectedTrxnId,
        setTrxns,
        // getFilteredTrxns,
        handleTrxnSelect,
        handleTrxnSubmit,
        handleTrxnChange,
        handleTrxnDelete,
        handleNewTrxn

        
    }


    
  return (
      <TrxnsContext.Provider value={TrxnsContextValue}>
            {children}
      </TrxnsContext.Provider>
  )
}
