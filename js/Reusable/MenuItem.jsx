import React from 'react'
import { Link } from 'react-router-dom'

const MenuItem = (props) => {
  return (
    <div className='large-3 column'>
      <div className='card'>
        <div className='card-divider'>
          <h5>{props.title}</h5>
        </div>
        <div className='card-section'>
          <p>{props.description}</p>
          <Link to={props.link} className='button'>Launch</Link>
        </div>
      </div>
    </div>
  )
}

export default MenuItem
