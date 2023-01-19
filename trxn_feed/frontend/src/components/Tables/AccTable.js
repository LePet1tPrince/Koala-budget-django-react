import React, { useState, useEffect } from 'react';
import pencil from '../../Assets/Images/pencil-icon.png';
import { useAccountsContext } from '../context/AccountContext';




const AccTable = (props) => {
    const { handleAccountSelect,
            selectedAccountId,
            handleAccountSubmit,
            handleAccountDelete,
            accountTypeOptions,
            accountSubTypeOptions } = useAccountsContext();
    const [editedAccount, setEditedAccount] = useState()
    const { header, data } = props;

    useEffect(() => {
        setEditedAccount(data.find(a => a.id === selectedAccountId))

    },[selectedAccountId])

    function handleAccountChange(changes) {
        setEditedAccount({...editedAccount, ...changes})
        console.log("Changes")
    }

    


  return (
    <div className="table-responsive">
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
                    <td scope="row">{acc.num}</td>
                    <td>{acc.name}</td>
                    <td>{acc.type}</td>                           
                    <td>{acc.subType}</td>
                    <td>
                    <button className="btn btn-info" onClick={() => handleAccountSelect(acc.id)}>
                        <img src={ pencil } width="20" height="20" alt="Edit Transaction"/>
                    </button>
                    </td>
                </tr>
                } else {
                    // When row gets selected, it becomes editable
                    return <tr key={acc.id}>
                    <td scope="row">
                        <input 
                        type="number"
                        name="number"
                        defaultValue={acc.num}
                        onChange={e => handleAccountChange({num: e.target.value})}></input>
                    </td>

                    <td>
                    <input 
                        type="text"
                        name="name"
                        defaultValue={acc.name}
                        onChange={e => handleAccountChange({name: e.target.value})}></input>
                    </td>
                    <td>
                    <select name="type"
                     defaultValue={acc.type}
                     onChange={e => handleAccountChange({type: e.target.value})}
                     >
                            {accountTypeOptions.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        </td>                           
                    <td>
                    <select
                    name="subType" 
                    defaultValue={acc.subType}
                    onChange={e => handleAccountChange({subType: e.target.value})}
                    >
                            {accountSubTypeOptions.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <button className="btn btn-success mx-2" onClick={() => handleAccountSubmit(editedAccount)}>
                            Save
                        </button>
                        <button className="btn btn-primary mx-2" onClick={() => handleAccountSelect(undefined)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger mx-2" onClick={() => handleAccountDelete(selectedAccountId)}>
                            Delete
                        </button>
                    
                    </td>

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