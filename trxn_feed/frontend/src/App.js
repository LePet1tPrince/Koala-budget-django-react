import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import 'bootstrap';
import './css/App.css';
import Header from './components/Header';
import TrxnsPage from './components/pages/TrxnsPage';
import BudgetPage from './components/pages/BudgetPage';
import BudgetTable from './components/Tables/BudgetTable';
import AccountPage from './components/pages/AccountPage';
import SideBar from './components/SideBar';
import GoalsPage from './components/pages/GoalsPage';
import DashboardPage from "./components/pages/DashboardPage";

import TrxnEdit from "./components/editComponents/TrxnEdit";
import HomePage from "./components/pages/HomePage";

import { v4 as uuidv4 } from 'uuid' ;
import FeedData from "./components/Tables/FeedData";
import { AppContext } from "./components/context/AppContext";




function App() {

  // const selectedTrxn = trxns.find(trxn => trxn.id === selectedTrxnId)

  function handleTrxnAdd() {
    const newTrxn = {
      id: uuidv4(),
      date: '2023-01-01',
      amount: 0,
      account: '',
      category: '',
      notes: ''

    }
  }
  
  return (
      <AppContext>
        <Router forceRefresh={true}>
          <div>
            <SideBar />
            {/* <Header /> */}
            <Route path="/" exact component={HomePage} />
            <Route path="/transactions" exact><TrxnsPage/></Route>
            {/* <Route path="/transactions/new" component={TrxnEdit} /> */}
            <Route path="/transactions/:id" component={TrxnEdit}  />
            <Route path="/transactions/:accid" component={TrxnsPage}  />

            <Route path="/accounts/:id" component={AccountPage} />
            <Route path="/accounts" component={AccountPage} />
            <Route path="/goals" component={GoalsPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/budget" component={BudgetPage} />
            {/* <Route path="/budget/:yr" component={BudgetTable} /> */}

            <Route path="/test" component={FeedData} />
          </div>
        </Router>
      </AppContext>

  );
}

export default App;
