import React from 'react'
import FileUpload from '../../Reusable/FileUpload.jsx'

const ProductMatchingUpload = (props) => {
  return <FileUpload
    actionUrl={'/api/product-matching/upload'}
    handleSubmit={props.handleSubmit}
    title='Select a file to upload'
    description='Make sure your tile is in .txt format and that it has all columns labeled. Some files leave out an ASIN column. Shift column headers to the right to insert a column named "ASIN".'
  />
}

export default ProductMatchingUpload
