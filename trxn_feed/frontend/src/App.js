import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import FeedPage from './pages/FeedPage';
import 'bootstrap';
import AccountPage from './pages/AccountPage';
import TrxnPage from './pages/TrxnPage';
import SideBar from './components/SideBar';
import Goals from './pages/Goals'
import Dashboard from "./pages/Dashboard";
import TrxnAdd from "./pages/TrxnAdd";



function App() {
  return (
    <Router forceRefresh={true}>
    <div>
      <SideBar />
      <Header />
      <Route path="/" exact component={FeedPage} />
      <Route path="/newtrxn" component={TrxnAdd} />
      <Route path="/trxn/:id" component={TrxnPage}  />
      <Route path="/accounts/:id" component={AccountPage} />
      <Route path="/accounts" component={AccountPage} />
      <Route path="/goals" component={Goals} />
      {/* <Route path="/dashboard" component={Dashboard} /> */}



      
    </div>
    </Router>
  );
}

export default App;
