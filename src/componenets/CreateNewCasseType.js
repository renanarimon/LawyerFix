import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { useState } from "react";
import Description from "./Description";

const CreateNewCaseType = () => {

    const [CaseType, SetCaseType] = useState('');
    const [Stage, SetStage] = useState('');
    const [StageList, SetStageList] = useState([]);
    const [StageFormList, SetStageFormList] = useState([]); // list of BoxForms
    const [StageIndex, SetStageIndex] = useState(1);




    const onAddStage = ({event}) => {
        SetStageFormList(StageFormList.concat(
            <Description key={StageIndex} index ={StageIndex} onChange={handleStage}/>
        ))
        const listCpt = StageList
        listCpt.push(Stage)
        SetStageList(listCpt)
        SetStageIndex(StageIndex+1)
        console.log(StageList)
    }

    const onDoneClick = ({event}) => {
        writeUserData();
        SetStage('')
        SetCaseType('')
        SetStageFormList([])
        SetStageIndex(0)
        SetStageList([])
    }

    const handleCaseType = (event) => {
        SetCaseType(event.target.value);
      };

    const handleStage = (event,stageNum) => {
        console.log("here" + stageNum);
        const listCpt = StageList
        listCpt[stageNum-1]=event.target.value
        SetStageList(listCpt)
        };
        
      function writeUserData() {
        const db = getDatabase();
        set(ref(db, `CaseType/${CaseType}`), {
            1 : StageList[0],
        });
        for (let i = 1; i < StageList.length; i++) {
            update(ref(db, `CaseType/${CaseType}`), {
                [i+1] : StageList[i],
            });
            
        }   
}
    
   
  return (
    <div style={{textAlign:'center'}}>
        <div className="caseType-input">
            <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28'}}>שם סוג התיק</label>
            <input  type='text'
             placeholder='הכנס/י שם סוג התיק' 
             style={{marginRight:'10px',width:'33%',height:'30px',borderRadius:'10px'}}
             onChange={handleCaseType}
             value={CaseType}
             />
        </div>
        {StageFormList}
        <div style={{display:'inline-grid'}}>
            <button onClick={onAddStage} className="btn-casetype" style={{marginTop:'25px'}}>הוסף תיאור</button>
            <button onClick={onDoneClick} className="btn-casetype">שמור</button>
        </div>
        
    </div>

    
  )
}

export default CreateNewCaseType