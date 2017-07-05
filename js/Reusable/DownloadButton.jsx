import React from 'react'

const DownloadButton = (props) => {
  return (
    <a className='button' href={props.path} download>Download File</a>
  )
}

export default DownloadButton
