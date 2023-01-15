import React from 'react'
import LawyerRequests from './LawyerRequests'

const PreviewRequestsTable = (props) => {
  return (
    <LawyerRequests Requests={props.previewRequests}/>
  )
}

export default PreviewRequestsTable