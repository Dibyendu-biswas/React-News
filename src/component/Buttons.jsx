import React from 'react'
import { useGlobalContext } from '../Context'

const Buttons = () => {
  const {handelPage,nbPages,page}=useGlobalContext()
  return (
    <section className='button'>
        <button onClick={()=>handelPage("dec")}>prev</button>
        <p>{page} of <span>{nbPages}</span></p>
        <button onClick={()=>handelPage("inc")}>next</button>
    </section>
  )
}

export default Buttons