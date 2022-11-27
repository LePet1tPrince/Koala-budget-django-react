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
    }

  return (
    <div>
        <div className='feed-list'>
            {feed.map((trxn, index) => (
                <h3 key={index}>{trxn.category}</h3>

            ))}
        </div>
    </div>
  )
}

export default FeedPage