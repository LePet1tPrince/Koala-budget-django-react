import './App.css';
import Header from './components/Header';
import FeedPage from './pages/FeedPage';
import 'bootstrap';
import AccountPage from './pages/AccountPage';


function App() {
  return (
    <div>
      <Header />
      <FeedPage />
      <AccountPage />
      
    </div>
  );
}

export default App;
