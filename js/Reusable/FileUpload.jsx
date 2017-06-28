import React from 'react'
import axios from 'axios'

const handleUpload = (event, props) => {
  event.preventDefault()

  const file = event.target.children.upload.files[0]
  let data = new window.FormData()
  data.append('upload', file)
  data.append('name', 'upload')
  axios.post(props.actionUrl, data, {headers: {'Content-Type': 'multipart/form-data'}})
    .then((res) => {
      props.handleSubmit(null, res)
    })
    .catch((err) => {
      props.handleSubmit(err, null)
    })
}

const FileUpload = (props, context) => {
  return (
    <div className='callout'>
      <h5>{props.title}</h5>
      <p>{props.description}</p>
      <form onSubmit={(e) => handleUpload(e, props)}>
        <label htmlFor='fileUpload' className='button secondary'>Select File</label>
        <input type='file' id='fileUpload' name='upload' className='show-for-sr' />
        <input type='submit' value='Upload' className='button' />
      </form>
    </div>
  )
}

export default FileUpload
