import React from 'react'
import { Link } from 'react-router-dom'

class Surround extends React.Component {
  render () {
    return (
      <div>
        <nav className='top-bar'>
          <div className='top-bar-left'>
            <ul className='dropdown menu'>
              <li className='menu-text'>Managed Marketplaces Tools</li>
            </ul>
          </div>
          <div className='top-bar-right'>
            <ul className='menu'>
              <li><Link to='/menu'>Main Menu</Link></li>
              <li><input type='search' placeholder='Search' onChange={this.props.handleSearch} /></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default Surround
