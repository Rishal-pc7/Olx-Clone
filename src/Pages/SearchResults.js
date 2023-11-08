import React from 'react'
import Banner from '../Components/Banner/Banner'
import Posts from '../Components/Posts/Posts'
import { useParams } from 'react-router-dom'

function SearchResults() {
  let {query}=useParams()

  return (
    <div>
        <Banner showImg={true}/>
        <Posts product={query}/>

    </div>
  )
}

export default SearchResults