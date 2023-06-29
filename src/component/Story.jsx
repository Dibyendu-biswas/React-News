import React from 'react'
import { useGlobalContext } from '../Context'

const Story = () => {
const {hits,isLoading,removeStory}=useGlobalContext()
if(isLoading){
  return(<div className='loading'>Loading....</div>)
}
  return (
    <section className='story'>
     {
      hits.map((story)=>{
        const {author,title,url,objectID,points,relevancy_score,}=story
        return(
          <section className='storyBox' key={objectID}>
            <div>
              <h3>{title}</h3>
            <p>Author : {author}</p>
            <p>Points : {points} <span>| Score : {relevancy_score}</span></p>
            <a href={url}>Details</a>
            <button className='btn' onClick={()=>removeStory(objectID)}> Remove</button>
            </div>
          </section>
        )
      })
     }
    </section>
  )
}

export default Story