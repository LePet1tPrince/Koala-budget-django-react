import React from 'react'

const SideBar = () => {

    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
      }
      
      function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
      }
  return (
        <div id="mySidebar" className="sidebar">
  <a className="active" href="/">Transaction Feed</a>
  <a href="/accounts">Accounts</a>
  <a href="/goals">Goals</a>
  <a href="/dashboard">Dashboard</a>
  

</div>



  )
}

export default SideBar