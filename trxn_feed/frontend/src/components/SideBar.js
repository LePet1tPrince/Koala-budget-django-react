import React from 'react'

const SideBar = () => {

    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
      }
      
      function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
      }
  return (
  <div>
        <div id="mySidebar" className="sidebar">
  <button className="btn btn-primary m-3" onClick={w3_close}> &#60; </button>
  <a className="active" href="/">Transaction Feed</a>
  <a href="/accounts">Accounts</a>
  <a href="/goals">Goals</a>
  <a href="/dashboard">Dashboard</a>
</div>
<button className="btn btn-primary m-3" onClick={w3_open}> 	&#62; </button>
</div>



  )
}

export default SideBar