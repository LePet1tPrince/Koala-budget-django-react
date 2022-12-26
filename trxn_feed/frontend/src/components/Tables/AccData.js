import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function AccData() {
    let [accounts, setAccounts] = useState([])



    useEffect(() => {
        getAccounts();

    }, [])

    let getAccounts = async () => {
        let response = await fetch('/api/accounts/')
        let accountsData = await response.json()
        setAccounts(accountsData)
    }


    function getCol(matrix, col){
      var column = [];
      for(var i=0; i<matrix.length; i++){
         column.push(matrix[i][col]);
      }
      return column;
   }
    var accountList = getCol(accounts, 'name');
  
  return (
    Array(accountList)
  )
}


export default AccData