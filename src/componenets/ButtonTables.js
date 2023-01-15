import React from 'react'

const ButtonTables = (props) => {
  return (
    <button className="btn-navigate-table" onClick={props.onClick } style={{backgroundColor:props.color}}>
    {props.text}
    </button>
  )
}

export default ButtonTables