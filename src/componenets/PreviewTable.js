import React, { useEffect, useMemo, useState } from 'react';
import CollapsibleTable from './CollapsibleTable'

const PreviewTable = (props) => {
    
    return (
      <>
        <CollapsibleTable setRenderAllCases={props.setRenderAllCases} cases={props.cases} casesType={props.casesType} loginType={props.loginType}/>
      </>
      )

  
}

export default PreviewTable