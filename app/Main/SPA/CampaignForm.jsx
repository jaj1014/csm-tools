import React from 'react'
import axios from 'axios'

class CampaignForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.submitForm = this.submitForm.bind(this)

    this.state = {
      campaignName: '',
      ad: '',
      adGroup: '',
      defaultBid: '',
      dailyBudget: '',
      file: this.props.file
    }
  }
  handleChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submitForm (e) {
    e.preventDefault()
    axios.post('/api/campaign-builder/build', this.state)
      .then((res) => {
        console.log(res.data)
        this.props.handleSubmit(null, res)
      })
      .catch((err) => {
        console.log(err.message, err)
        this.props.handleSubmit(err, null)
      })
  }
  render () {
    return (
      <form onSubmit={this.submitForm}>
        <div className='row'>
          <div className='large-4 column'>
            <label>Campaign Name
               <input name='campaignName' type='text' onChange={this.handleChange} />
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='large-4 column'>
            <label> Campaign Daily Budget
              <div className='input-group'>
                <span className='input-group-label'>$</span>
                <input className='input-group-field' name='dailyBudget' type='number' min='0.00' step='any' placeholder='enter bid' onChange={this.handleChange} />
              </div>
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='large-4 column'>
            <label>SKU Field
              <select name='ad' value={this.state.ad} onChange={this.handleChange}>
                <option value='' />
                {this.props.data.headers.map(header => <option key={`${header}-ad`} value={header}>{header}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='large-4 column'>
            <label>Ad Group Name
              <select name='adGroup' value={this.state.adGroup} onChange={this.handleChange}>
                <option value='' />
                {this.props.data.headers.map(header => <option key={`${header}-adgroup`} value={header}>{header}</option>)}
              </select>
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='large-4 column'>
            <label> Ad Group Bid
              <div className='input-group'>
                <span className='input-group-label'>$</span>
                <input className='input-group-field' name='defaultBid' type='number' min='0.00' step='any' placeholder='enter bid' onChange={this.handleChange} />
              </div>
            </label>
          </div>
        </div>
        <input type='submit' className='button' value='Submit' />
      </form>
    )
  }
}

export default CampaignForm
