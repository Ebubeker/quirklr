import React from 'react'
import FeedGrid from '../../components/feed/FeedGrid'
import AddIcon from '../../lib/assets/icons/AddIcon'
import { Link } from 'react-router-dom'

const Feed = () => {
  return (
    <div>
      <FeedGrid/>
      <Link to="/share-post" className='addPostFeed'>
        <AddIcon color="#ffffff"/>
      </Link>
    </div>
  )
}

export default Feed
