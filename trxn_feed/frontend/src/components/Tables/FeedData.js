import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FeedTable from './TrxnsTable';
import { useTrxnsContext, useAccountsContext } from '../context/AppContext';


function FeedData() {
  const { trxns } = useTrxnsContext()
  const { accounts } = useAccountsContext()
  // console.log({trxns})

    // let [feed, setFeed] = useState([])



    // useEffect(() => {
    //     getFeed();

    // }, [])

    // let getFeed = async () => {
    //     let response = await fetch('/api/feed/')
    //     let feedData = await response.json()
    //     setFeed(feedData)
    // }

    
  const Headers = ['Date','Amount','Category','Account','Notes'];
  
  return (
    <div className="sidebar-margin">
      {JSON.stringify(trxns)}
      <div>
        {accounts.map(x => x.name)}
      </div>
      

        
    </div>
  )
}

export default FeedData