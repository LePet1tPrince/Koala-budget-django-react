import React from 'react';
import koala from '../../Assets/Images/Koala.jpg';
import koalaTree from '../../Assets/Images/koalaTree.png';



export default function HomePage() {
  return (
    <div className="sidebar-margin">
      <div className="container h-100">
        <div className="row">
          <div className="col">
            <h1>Welcome To Koala Budget</h1>

          </div>
          <div className="col">
            <div className="d-flex justify-content-center align-items-center bg-info rounded-circle koala-circle border border-dark">
              <img className="koala-img" src={koalaTree}></img>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-6">
            <div class="card bg-success rounded-5 m-3">
              <div class="card-body font-28 m-3">
                A user-friendly budgeting app. Use the side bar to navigate the site, with accounts, transactions, and set your budget. 
                Once you've done all that, go to your dashboard to see how your your actual spending lines up with your budget.
              </div>
            </div>
          </div>

        </div>

      </div>

        

        </div>
  )
}
