import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'

import Surround from './Surround.jsx'
import Menu from './Menu.jsx'
import CampaignBuilder from './Main/SPA/CampaignBuilder.jsx'
import ProductMatching from './Main/ProductMatching/ProductMatching.jsx'

class Index extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route path='/' component={Surround} />
          <div className='row'>
            <Route path='/menu' component={Menu} />
            <Route path='/campaign-builder' component={CampaignBuilder} />
            <Route path='/product-matching' component={ProductMatching} />
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app'))

export default Index
