import React, { useState, useEffect } from 'react'


const FeedPage = () => {

    let [feed, setFeed] = useState([])

    useEffect(() => {
        getFeed()

    }, [])

    let getFeed = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/feed/')
        let data = await response.json()
        setFeed(data)
        console.log(feed)
    }

  return (
    <div>
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

    </tr>
  </thead>
  <tbody>
  {feed.map((trxn, index) => (
                <tr key={index}>
                    <th scope="row">{trxn.date}</th>
                    <th>{trxn.amount}</th>
                    <th>{trxn.account}</th>
                    <th>{trxn.category}</th>
                    <th>{trxn.notes}</th>
                </tr>

            ))}
    
  </tbody>
</table>
</div>
        </div>
    </div>
  )
}

export default FeedPage