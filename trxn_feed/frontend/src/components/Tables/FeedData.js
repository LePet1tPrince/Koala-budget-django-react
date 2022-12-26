import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function FeedData() {
    let [feed, setFeed] = useState([])



    useEffect(() => {
        getFeed();

    }, [])

    let getFeed = async () => {
        let response = await fetch('/api/feed/')
        let feedData = await response.json()
        setFeed(feedData)
    }

    
  const Headers = ['Date','Amount','Category','Account','Notes'];
  
  return (
    <div className="sidebar-margin">
        
    </div>
  )
}

export default FeedData