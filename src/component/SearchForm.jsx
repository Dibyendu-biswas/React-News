import React from 'react'
import { useGlobalContext } from '../Context'

const SearchForm = () => {
  const {searchItem,query}=useGlobalContext()
  return (
   <section className='search'>
     <form onSubmit={(e)=>e.preventDefault()}>
        <h1>Search</h1>
        <input type="text" onChange={(e)=>searchItem(e.target.value)}/>
    </form>
   </section>
  )
}

export default SearchForm