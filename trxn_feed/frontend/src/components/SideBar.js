import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import leftChevron from '../assets/Images/leftChevron.png';
import rightChevron from '../assets/Images/rightChevron.png';
import SidebarLink from './SidebarLink';
import barChart from '../assets/Images/bar-chart.png';
import receipt from '../assets/Images/receipt-solid.svg';
import home from '../assets/Images/home.png';
import dollar from '../assets/Images/dollar-sign-solid.svg';
import piggyBank from '../assets/Images/piggy-bank.png';
import register from '../assets/Images/cash-register-solid.svg';







const SideBar = () => {
  const [ activeLink, setActiveLink ] = useState('home')


    function w3_open() {
        // document.getElementById("mySidebar").style.display = "block";
        document.getElementById("mySidebar").classList.toggle("show");
      }
      
      function w3_close() {
        document.getElementById("mySidebar").classList.add("show");
      }
  return (
  <aside className="w-64" aria-label="Sidebar">
      <div id="mySidebar" className="sidebar px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800">
        <button className="btn btn-primary m-3" onClick={w3_open}> 
          <img src={leftChevron} width="20px"/>
         </button>
         <SidebarLink path="/" text="Home" setActiveLink={setActiveLink} icon={home}/>
         <SidebarLink path="/transactions" text="Transactions" setActiveLink={setActiveLink} icon={receipt}/>
         <SidebarLink path="/accounts" text="Accounts" setActiveLink={setActiveLink} icon={piggyBank}/>
         <SidebarLink path="/budget" text="Budget" setActiveLink={setActiveLink} icon={register}/>
         <SidebarLink path="/goals" text="Goals" setActiveLink={setActiveLink} icon={dollar}/>
         <SidebarLink path="/dashboard" text="Dasbhoard" setActiveLink={setActiveLink} icon={barChart}/>

     



 
      </div>
  <button className="btn btn-primary m-3" onClick={w3_open}>
    <img src={rightChevron} width="20px"/>

  </button>
</aside>



  )
}

export default SideBar