import React from 'react'
import ProductMatchingUpload from './ProductMatchingUpload.jsx'
// import DownloadButton from '../../Reusable/DownloadButton.jsx'

class ProductMatching extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      step: 1,
      data: '',
      file: ''
    }
  }
  render () {
    let currentStep
    switch (this.state.step) {
      case 1:
        currentStep = <ProductMatchingUpload />
        break
    }

    return (
      <div>
        <div className='large-12 column'>
          <h2>Product Matching</h2>
        </div>
        <div className='large-12 column'>
          {currentStep}
        </div>

      </div>
    )
  }
}

export default ProductMatching
