import React, { useState, useEffect } from 'react';
import TrxnItem from '../components/TrxnItem';
import FeedTable from '../components/Tables/FeedTable';

const FeedPage = () => {

    let [feed, setFeed] = useState([])

    useEffect(() => {
        getFeed()

    }, [])

    let getFeed = async () => {
        let response = await fetch('/api/feed/')
        let data = await response.json()
        setFeed(data)
        console.log(feed[0])
    }

    // get accounts list
    let [Accounts, setAccounts] = useState([])

  useEffect(() => {
      getAccounts()

  }, [])

  let getAccounts = async () => {
      let response = await fetch('/api/accounts/')
      let data = await response.json()
      setAccounts(data)
      // console.log(data)
  }
    
  const Headers = ['Date','Amount','Category','Account','Notes'];
  
  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
              <FeedTable header={Headers} data={feed} lookup={Accounts} />
        
            </div>
        </div>
    </div>
  )
}

export default FeedPage