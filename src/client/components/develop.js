/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

/*******************************************************
  IMPORT STATEMENTS
*******************************************************/
import React,{useState,useEffect} from "react";
import styled from "styled-components";
import '../styles/develop.css'
import ace from "../../../ace-builds/src-noconflict/ace";
import "../../../ace-builds/webpack-resolver";
import "../../../ace-builds/src-noconflict/mode-javascript";
import "../../../ace-builds/src-noconflict/theme-clouds"
import $ from "jquery";
import { exist } from "should";
/*******************************************************
  HELPER FUNCTIONS
*******************************************************/

/**
 * Submits code in editor cell to the server
 * @param {editor} Ace editor which contains code to execute on the server
**/
const submit_code = (editor) => {
  fetch("/v1/develop", {
    method: "POST",
    body: JSON.stringify({"code": editor.getValue()}),
    headers: {
      "content-type": 'application/json' 
    }
  }).then(res=>{
    if (res.ok){
      console.log('Successfully sent data');
    } else res.json().then(error => console.log(error));
  })
}

/*******************************************************
  STYLED COMPONENTS
*******************************************************/
const backgroundCodingField = "#ECECEC";
const borderColor = "#a9a9a9";
const bodyBackgroundColor = "#28474b";
const buttonHoverColor = "#D4D4D4";

const DeveloperEnvironment = styled.div`
  margin-top: 10px;
  margin-right: 20px;
  display: block;
  justify-content: left;
  grid-area: main;
  background: ${backgroundCodingField};
  height: auto;
  border: 1px solid ${borderColor};
`;

const DeveloperContent = styled.div`
  padding: 0px;
  overflow-x: hidden; 
  overflow-x: auto;
  max-height: 85vh;
  min-height: 85vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`
/*******************************************************
  SUB-COMPONENTS
*******************************************************/

const CellEditorSettingsContainer = styled.div`
  width: 140px;
  height: 20px;
  background: ${backgroundCodingField};
  border: 1px solid gray;
  float:right;
  margin-right:2px;
  margin-bottom: 2px;
  display: flex;
  flex-direction:row;
  flex-grow:1;
`

const CustomEditorSettingsButton = styled.button`
  height: 100%;
  margin: 0px;
  flex-grow: 1;
  background: ${backgroundCodingField};
  border: 1px solid ${borderColor};
  border-width: 0px 1px 0px 0px;
  &:hover {
    background: ${buttonHoverColor};
  }
`;

const CellEditorSettings = ({cellSettingsHandlerFunc}) => {
  return (
    <CellEditorSettingsContainer>
      <CustomEditorSettingsButton onClick={()=> cellSettingsHandlerFunc('delete')}>Delete</CustomEditorSettingsButton>
      <CustomEditorSettingsButton onClick={()=> cellSettingsHandlerFunc('up')}>Up</CustomEditorSettingsButton>
      <CustomEditorSettingsButton onClick={()=> cellSettingsHandlerFunc('down')}>Down</CustomEditorSettingsButton>
    </CellEditorSettingsContainer>
  )
}

const CellContainerMain = styled.div`
  margin: 10px
  font-size: 17px;
  &:hover {
    filter: drop-shadow(0px 1px 5px black);
  }
  background: #dddddd;
  border: 1px solid #dddddd;
`;

const CellContainerInside = styled.div`
  margin: 10px 10px 0px 10px;
  padding: 0px;
`
const EditorField = styled.div`
  padding:  0px;
  margin-top:0px;
  display:block;
  min-width: 100%;
  width:auto;
  border: 1px solid ${borderColor};
  border-width: 1px 1px 0px 1px;
`;

const OutputContainerMain = styled.div`
  padding:  0px;
  margin: 0px 0px 10px 0px;
  border: 1px solid ${borderColor};
  background: ${backgroundCodingField};
  min-width: 100%;
  font-size: 12px;
`

const OutputContainerInside = styled.div`
  margin-left: 39px;
  display: flex;
  flex-grow:1;
  border: 1px solid ${borderColor};
  border-width: 0px 0px 0px 1px;
  background: ${backgroundCodingField};
`
const OutputContainerInsideResults = styled.div`
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
`
const OutputField = styled.pre`
  padding: 0px;
  margin: 0px;
  min-height:39px;
`;

const CustomButtonDeleteOutput = styled.button`
  width:39px;
  height:39px;
  padding: 0px;
  margin: 0px;
  border: 0px;
  background: ${backgroundCodingField};
  float:left;
  &:hover {
    background: ${buttonHoverColor};
  }
`;

const JavascriptCell = ({id,cellSettingsHandlerFunc}) => {

  const [editor,setEditor] = useState(null);
  const [cellOutput,setCellOutput] = useState('');

  const handleKeyDown = (event) =>{
    if (event.key === 'Enter' && event.shiftKey){
      event.preventDefault();
      setCellOutput(`Simple Echoing command when Shift+Enter is pressed\n\n${editor.getValue()}`)
      $('#DeveloperContent').scrollTop($('#DeveloperContent')[0].scrollHeight);
    }
  }

  const clearOutput = (event) => {
    event.preventDefault();
    setCellOutput('');
  };
  
  useEffect(()=>{
    let editor_new = ace.edit(document.getElementById(`editor${id}`));
    editor_new.setTheme("ace/theme/clouds");
    editor_new.getSession().setMode("ace/mode/javascript");
    editor_new.getSession().setUseWrapMode(true);
    editor_new.resize();
    editor_new.setOptions({minLines: 3});
    editor_new.setOptions({maxLines: 35});
    editor_new.setHighlightActiveLine(false);
    setEditor(editor_new)
  });

  return (
    <CellContainerMain>
      <CellContainerInside>
      <CellEditorSettings cellSettingsHandlerFunc = {cellSettingsHandlerFunc} id={`editorSettings${id}`}></CellEditorSettings>
      <EditorField onKeyDown={handleKeyDown} id={`editor${id}`}></EditorField>
        { cellOutput != '' ?
        <OutputContainerMain>
          <CustomButtonDeleteOutput onClick={clearOutput}>Clear</CustomButtonDeleteOutput>
          <OutputContainerInside>
            <OutputContainerInsideResults>
              <OutputField>{cellOutput}</OutputField>
            </OutputContainerInsideResults>
          </OutputContainerInside>
        </OutputContainerMain>
          : <OutputContainerMain></OutputContainerMain>
        }
      </CellContainerInside>
    </CellContainerMain>
  )
};


const CustomCellEnvironmentHeader = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 30px;
  border: 1px solid ${borderColor};
  border-width: 0px 0px 1px 0px;
  display: flex;
  flex-direction: row;
`;

const CustomCellEnvironmentHeaderButton = styled.button`
  width: 50px;
  height: 100%;
  margin: 0px;
  padding: 0px;
  background: ${backgroundCodingField};
  border: 0px;
  &:hover {
    background: ${buttonHoverColor};
  }
`
const DeveloperHeader = ({addCodeCellFunc}) => {
  
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.name == "code"){
      addCodeCellFunc();
    } else if (event.target.name == "text"){
      console.log("Creating text cell...");
    }
  };

  return (
    <CustomCellEnvironmentHeader>
      <CustomCellEnvironmentHeaderButton onClick={handleClick} style={{'marginLeft': '3px'}} name="code" >+ Code</CustomCellEnvironmentHeaderButton>
      <CustomCellEnvironmentHeaderButton onClick={handleClick} name="text">+ Text</CustomCellEnvironmentHeaderButton>
    </CustomCellEnvironmentHeader>
  )

}



export const DeveloperComponent = () => {
  
  const createID = () => {return Math.random().toString(36).substring(7)};

  const [cells,setCells] = useState([createID()]);
  const swap = (arr,i,j) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    return arr;
  }
  const cellSettingsHandlerFuncGenerator = (id) => {
    return (function(action) {
      let new_list = [...cells];
      if (action == 'delete'){
        
        new_list = new_list.filter(cellId => cellId != id);
        console.log(new_list);
      }  else if (action == 'up'){
         let index = new_list.indexOf(id);
         if (index == -1){
           console.log('ERROR: Item doesn\'t exist...');
         } else {
            if (index != 0){
              new_list = swap(new_list,index,index-1)
            }
         }
      } else if (action == 'down'){
        let index = new_list.indexOf(id);
        if (index == -1){
          console.log('ERROR: Item doesn\'t exist...');
        } else {
           if (index != new_list.length-1){
             new_list = swap(new_list,index,index+1)
           }
        }
      }
      setCells(new_list); 
    });
  }

  useEffect(()=>{
    setCellList(createCellList(cells));
    $('#DeveloperContent').scrollTop($('#DeveloperContent')[0].scrollHeight);
  },[cells]);

  const createCellList = (cell_list) => {
    return cell_list.map((id)=>{
      return (
        <JavascriptCell cellSettingsHandlerFunc = {cellSettingsHandlerFuncGenerator(id)} key={id} id = {id}></JavascriptCell>
      )
    });
  }
  
  const [cellList,setCellList] = useState(createCellList(cells));

  const addCodeCellFunc = () => {
      let new_id = createID();
      let new_list = [...cells]
      new_list.push(new_id);
      setCells(new_list);
  }
  return (
    <DeveloperEnvironment>
        <DeveloperHeader addCodeCellFunc={addCodeCellFunc}></DeveloperHeader>
        <DeveloperContent id ="DeveloperContent">
          {cellList}
        </DeveloperContent>
    </DeveloperEnvironment>
  )
}


export const Develop = () => {
  useEffect(()=>{
    document.body.style.backgroundColor = `${bodyBackgroundColor}`;
    $( "#footer" ).remove();
  });
  return (
    <DeveloperComponent></DeveloperComponent>
  )
};
