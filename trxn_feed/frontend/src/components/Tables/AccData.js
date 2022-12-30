import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccounts } from '../context/AppContext';



function AccData() {
    const accounts = useAccounts()




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