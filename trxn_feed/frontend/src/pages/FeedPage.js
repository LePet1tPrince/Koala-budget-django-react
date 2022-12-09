import React, { useState, useEffect } from 'react';
import TrxnItem from '../components/TrxnItem';
import FeedTable from '../components/Tables/FeedTable';
import Plus from '../Assets/Images/plus.svg';
import { Link } from 'react-router-dom';

const FeedPage = () => {

    let [feed, setFeed] = useState([])
    let [Accounts, setAccounts] = useState([])

    useEffect(() => {
        getFeed();
        getAccounts();

    }, [])

    let getFeed = async () => {
        let response = await fetch('/api/feed/')
        let feedData = await response.json()
        setFeed(feedData)
        // console.log(Array.isArray(feed))
    }

    // get accounts list
    let getAccounts = async () => {
        let response = await fetch('/api/accounts/')
        let accdata = await response.json()
        setAccounts(accdata)
        console.log("accounts =", Accounts)
    }
    
  const Headers = ['Date','Amount','Category','Account','Notes'];
  
  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
                <div className="d-flex justify-content-between">
                <h1>Transaction Feed</h1>
                <Link to="/newtrxn">
                    <img src= { Plus } className="img-fluid" width="70" height="50" alt="..."/>
                </Link>
                </div>
              <FeedTable header={Headers} data={feed} lookup={Accounts} />
        
            </div>
        </div>
    </div>
  )
}

export default FeedPage