import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import 'bootstrap';
import './css/app.css';
import Header from './components/Header';
import TrxnsPage from './components/pages/TrxnsPage';
import AccountPage from './components/pages/AccountPage';
import TrxnPage from './components/detailView/TrxnPage';
import SideBar from './components/SideBar';
import Goals from './components/pages/Goals'
import Dashboard from "./components/pages/Dashboard";
import TrxnAdd from "./components/addComponents/TrxnAdd";
import HomePage from "./components/pages/HomePage";
import { v4 as uuidv4 } from 'uuid' ;
import FeedData from "./components/tables/FeedData";
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
          <Header />
          <Route path="/" exact component={HomePage} />
          <Route path="/transactions" exact component={TrxnsPage} />
          <Route path="/transactions/new" component={TrxnAdd} />
          <Route path="/transactions/:id" component={TrxnPage}  />
          <Route path="/accounts/:id" component={AccountPage} />
          <Route path="/accounts" component={AccountPage} />
          <Route path="/goals" component={Goals} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/test" component={FeedData} />
        </div>
      </Router>
    </AppContext>
  );
}

export default App;
