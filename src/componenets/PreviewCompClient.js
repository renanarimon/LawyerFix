import React, { useState , useEffect } from 'react'
import CollapsibleTable from './CollapsibleTable'




const PreviewCompClient = (props) => {

    return (
        <div className='container'>
            <CollapsibleTable setRenderAllCases={props.setRenderAllCases} cases={props.allCases} casesType={props.allCaseTypes} loginType={props.loginType} />
        </div>
        )
}

export default PreviewCompClient