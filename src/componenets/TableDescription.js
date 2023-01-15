import React from 'react'

const TableDescription = ({index,text}) => {

    return (
  
      <div className='description-form'>
          
          <div className='description-index' style={{alignItems:'center'}}>
              <h1>{index}</h1>
          </div>
          <p style={{marginRight:'20px'}}><h6>{text}</h6></p>
  
      </div>
    )
  }
  export default TableDescription
  