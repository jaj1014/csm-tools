import React from 'react'
import FileUpload from '../../Reusable/FileUpload.jsx'

const SPAFileUpload = (props) => {
  return <FileUpload
    actionUrl={'/api/campaign-builder/upload'}
    handleSubmit={props.handleSubmit}
    uploadTitle='Upload a file to start your campaign'
    description='Use the "Select File" button below to start building your campaign. Make sure your file includes a SKU field and all fields you plan to use for organizing your campaign.'
  />
}

export default SPAFileUpload
