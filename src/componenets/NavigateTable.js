import React from 'react'
import Search from './Search'

const NavigateTable = (props) => {

    const searchCases = (e,searchInput) => {
        e.preventDefault();
        if(props.previewIndex===0){
            const temp = props.allCases
            const casesByName = temp.filter(item => item.ClientName === searchInput)
            const casesByCaseNum = temp.filter(item => item.CaseNum === searchInput)
            if(casesByName.length > 0 ){
                props.setPreviewCases(casesByName)
            }
            else if(casesByCaseNum.length > 0){
                props.setPreviewCases(casesByCaseNum)
            }
            else{
                props.setPreviewCases([])
            }
        } 
        else if(props.previewIndex===1){
            const temp = props.activeCases
            const casesByName = temp.filter(item => item.ClientName === searchInput)
            const casesByCaseNum = temp.filter(item => item.CaseNum === searchInput)
            if(casesByName.length > 0 ){
                props.setPreviewCases(casesByName)
            }
            else if(casesByCaseNum.length > 0){
                props.setPreviewCases(casesByCaseNum)
            }
            else{
                props.setPreviewCases([])
            }
        }
        else if(props.previewIndex===2){
            const temp = props.myCases
            const casesByName = temp.filter(item => item.ClientName === searchInput)
            const casesByCaseNum = temp.filter(item => item.CaseNum === searchInput)
            if(casesByName.length > 0 ){
                props.setPreviewCases(casesByName)
            }
            else if(casesByCaseNum.length > 0){
                props.setPreviewCases(casesByCaseNum)
            }
            else{
                props.setPreviewCases([])
            }
        }
        else{
            const temp = props.myActiveCases
            const casesByName = temp.filter(item => item.ClientName === searchInput)
            const casesByCaseNum = temp.filter(item => item.CaseNum === searchInput)
            if(casesByName.length > 0 ){
                props.setPreviewCases(casesByName)
            }
            else if(casesByCaseNum.length > 0){
                props.setPreviewCases(casesByCaseNum)
            }
            else{
                props.setPreviewCases([])
            }
        }

        
    }

  return (
    <div>
        <div style={{marginBottom:'15px'}}>
            <button className={props.previewIndex==2 ? "btn-clicked" : "btn-not-clicked"} onClick={(e) => {
                props.onClick(e, 2)
                props.setPreviewCases(props.myCases)
            }
            }>
                התיקים שלי
            </button>
            <button className={props.previewIndex==3 ? "btn-clicked" : "btn-not-clicked"} onClick={(e) => {
                props.onClick(e, 3)
                props.setPreviewCases(props.myActiveCases)
            }
            }>
                התיקים הפעילים שלי
            </button>


            {props.loginType === "Admin" &&
            <button className={props.previewIndex==0 ? "btn-clicked" : "btn-not-clicked"} onClick={(e) => {
                    props.onClick(e, 0)  
                    props.setPreviewCases(props.allCases)
                }
                }
                >
                    כל התיקים
                </button>}
                {props.loginType === "Admin" &&
                <button className={props.previewIndex==1 ? "btn-clicked" : "btn-not-clicked"} onClick={(e) => {
                    props.onClick(e, 1)
                    props.setPreviewCases(props.activeCases)
                }
                }>
                    כל התיקים הפעילים
                </button>}
               



        </div>

        <div>
            <Search previewCases={props.previewCases} setPreviewCases={props.setPreviewCases} onClick={searchCases} />
        </div>
    </div>
  )
}

export default NavigateTable