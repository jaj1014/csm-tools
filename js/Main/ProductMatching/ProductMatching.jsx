import React from 'react'
import ProductMatchingUpload from './ProductMatchingUpload.jsx'
import DownloadButton from '../../Reusable/DownloadButton.jsx'

class ProductMatching extends React.Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      step: 1,
      data: '',
      file: ''
    }
  }
  handleSubmit (err, res) {
    if (err) {
      console.log(err)
    } else {
      this.setState((prevState) => {
        return { data: res.data, file: res.data.file, step: prevState.step + 1 }
      })
    }
  }
  render () {
    let currentStep
    switch (this.state.step) {
      case 1:
        currentStep = <ProductMatchingUpload handleSubmit={this.handleSubmit} />
        break
      case 2:
        currentStep = <DownloadButton path={this.state.data} />
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
