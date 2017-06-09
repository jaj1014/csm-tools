import React from 'react'

const DownloadButton = (props) => {
  return (
    <form method='get' action={props.path}>
      <button type='submit' className='button'>Download Campaign</button>
    </form>
  )
}

export default DownloadButton
