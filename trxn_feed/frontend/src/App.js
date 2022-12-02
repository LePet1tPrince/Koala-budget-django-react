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



function App() {
  return (
    <Router forceRefresh={true}>
    <div>
      <SideBar />
      <Header />
      <Route path="/" exact component={FeedPage} />
      <Route path="/trxn/:id" component={TrxnPage}  />
      <Route path="/accounts" component={AccountPage} />
      <Route path="/accounts/:id" component={AccountPage} />
      
    </div>
    </Router>
  );
}

export default App;
