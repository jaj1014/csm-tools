import React from 'react'
import FileUpload from '../../Reusable/FileUpload.jsx'

const SPAFileUpload = (props) => <FileUpload actionUrl={'/api/product-matching/upload'} handleSubmit={props.handleSubmit} />

export default SPAFileUpload
