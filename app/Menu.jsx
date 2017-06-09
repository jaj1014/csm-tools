import React from 'react'
import MenuItem from './Reusable/MenuItem.jsx'

class Menu extends React.Component {
  render () {
    return (
      <div className='row'>
        <MenuItem
          title='Campaign Builder'
          description='Build sponsored products campaigns from inventory files.'
          link='/campaign-builder' />
      </div>
    )
  }
}

export default Menu
