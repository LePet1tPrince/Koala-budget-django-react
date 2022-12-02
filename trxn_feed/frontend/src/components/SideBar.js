import React from 'react'

const SideBar = () => {

    function w3_open() {
        document.getElementById("mySidebar").style.display = "block";
      }
      
      function w3_close() {
        document.getElementById("mySidebar").style.display = "none";
      }
  return (
        <div id="mySidebar" class="sidebar">
  <a class="active" href="/">Transaction Feed</a>
  <a href="/accounts">Accounts</a>
</div>



  )
}

export default SideBar