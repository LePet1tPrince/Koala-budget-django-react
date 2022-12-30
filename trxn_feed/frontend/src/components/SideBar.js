import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {

    function w3_open() {
        // document.getElementById("mySidebar").style.display = "block";
        document.getElementById("mySidebar").classList.toggle("show");
      }
      
      function w3_close() {
        document.getElementById("mySidebar").classList.add("show");
      }
  return (
  <div>
      <div id="mySidebar" className="sidebar">
        <button className="btn btn-primary m-3" onClick={w3_open}> &#60; </button>
        <Link to="/">Home</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/accounts">Accounts</Link>
        <Link to="/goals">Goals</Link>
        <Link to="/dashboard">Dashboard</Link>


 
      </div>
  <button className="btn btn-primary m-3" onClick={w3_open}> 	&#62; </button>
</div>



  )
}

export default SideBar