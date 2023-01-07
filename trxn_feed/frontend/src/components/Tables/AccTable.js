import React, { useState, useEffect } from 'react';
import pencil from '../../assets/Images/pencil-icon.png';




const AccTable = (props) => {
    const [editedAccount, setEditedAccount] = useState()
    const { header, data, handleAccountSelect, selectedAccountId, handleAccountSubmit } = props;

    useEffect(() => {
        setEditedAccount(data.find(a => a.id === selectedAccountId))

    },[selectedAccountId])

    function handleAccountChange(changes) {
        setEditedAccount({...editedAccount, ...changes})
        console.log("Changes")
    }

    


  return (
    <div class="table-responsive">
        <table className="table table-striped">
            <thead>
                <tr>
                    {header.map((title, index) => (
                        <th scope="col" key={index}>{title}</th>
                    ))}

                </tr>
            </thead>
            <tbody>
            {data.map((acc, index) => {
                if (acc.id !== selectedAccountId) {
                    // Non editable rows
                    return <tr key={acc.id}>
                    <th scope="row">{acc.num}</th>
                    <th>{acc.name}</th>
                    <th>{acc.type}</th>                           
                    <th>{acc.subType}</th>
                    <button className="btn btn-info" onClick={() => handleAccountSelect(acc.id)}>
                        <img src={ pencil } width="20" height="20" alt="Edit Transaction"/>
                    </button>
                </tr>
                } else {
                    // When row gets selected, it becomes editable
                    return <tr key={acc.id}>
                    <th scope="row">
                        <input 
                        type="number"
                        name="number"
                        defaultValue={acc.num}
                        onChange={e => handleAccountChange({num: e.target.value})}></input>
                    </th>

                    <th>
                    <input 
                        type="text"
                        name="name"
                        defaultValue={acc.name}
                        onChange={e => handleAccountChange({name: e.target.value})}></input>
                    </th>
                    <th>
                    <select name="type"
                     defaultValue={acc.type}
                     onChange={e => handleAccountChange({type: e.target.value})}
                     >
                            {data.map((account) => (
                                <option key={account.id} value={account.type}>{account.type}</option>
                            ))}
                        </select>
                        </th>                           
                    <th>
                    <select
                    name="subType" 
                    defaultValue={acc.subType}
                    onChange={e => handleAccountChange({subType: e.target.value})}
                    >
                            {data.map((account, i) => (
                                <option key={account.id} value={account.subType}>{account.subType}</option>
                            ))}
                        </select>
                    </th>
                    <button className="btn btn-success" onClick={() => handleAccountSubmit(editedAccount)}>
                        Save
                    </button>

                    <button className="btn btn-danger" onClick={() => handleAccountSelect(undefined)}>
                        Cancel
                    </button>
                    

                    </tr>
                }}
                                

                            )}
                
            </tbody>
            </table>
            {/* <div>{accountList}</div> */}
    </div>
  )
}

export default AccTable