import React, { useState, useEffect } from 'react';
import TrxnItem from '../components/TrxnItem';
import TrxnFeed from '../components/TrxnFeed';


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
    

  return (
    <div className="sidebar-margin">
        <div className='feed-list'>
            <div className="p-5 m-5">
            <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Amount</th>
      <th scope="col">Account</th>
      <th scope="col">Category</th>
      <th scope="col">Notes</th>
      <th scope="col">See More</th>

    </tr>
  </thead>
  <tbody>
    {feed.map((trxn, index) => (
      
      <TrxnFeed key={index} trxn={trxn} index={index} accounts={Accounts} />
      

            ))}
    
  </tbody>
</table>
        
</div>
        </div>
    </div>
  )
}

export default FeedPage