import React from 'react'


const Description = ({index,onChange}) => {

    console.log("Description"+ {index})

  return (

    <div className='description-form'>
        
        <div className='description-index'>
            <h1>{index}</h1>
        </div>
        <textarea 
            key={index}
            className='description' 
            aria-label="With textarea"  
            placeholder="תיאור" 
            onChange ={(e)=>onChange(e,index)}
           

            >
        </textarea>

    </div>
  )
}

export default Description