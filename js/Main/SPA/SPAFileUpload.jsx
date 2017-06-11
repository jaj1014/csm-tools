import React from 'react'
import FileUpload from '../../Reusable/FileUpload.jsx'

const SPAFileUpload = (props) => <FileUpload actionUrl={'/api/campaign-builder/upload'} handleSubmit={props.handleSubmit} />

export default SPAFileUpload
