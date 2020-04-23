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
const bodyBackgroundColor = "#ECECEC";;
const buttonHoverColor = "#D4D4D4";

const CellEnvironment = styled.div`
  margin-top: 50px;
  margin-right: 30px;
  display: block;
  justify-content: left;
  grid-area: main;
  background: ${backgroundCodingField};
  height: 100vh;
  overflow-x: hidden; 
  overflow-x: auto;
  border: 1px solid ${borderColor};
`;

/*******************************************************
  SUB-COMPONENTS
*******************************************************/

const CellEditorSettingsContainer = styled.div`
  width: 140px;
  height: 20px;
  background: ${backgroundCodingField};
  border: 1px solid gray;
  float:right;
  margin-right:10px;
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
      <CustomEditorSettingsButton onClick={cellSettingsHandlerFunc}>Delete</CustomEditorSettingsButton>
      <CustomEditorSettingsButton onClick={cellSettingsHandlerFunc}>Settings</CustomEditorSettingsButton>
    </CellEditorSettingsContainer>
  )
}

const CellField = styled.div`
  margin: 20px 10px 10px 10px;
  padding: 4px 0px 4px 4px;
  filter: drop-shadow(0px 10px 5px gray);
  font-size: 17px;
`;

const EditorField = styled.div`
  padding:  0px;
  margin:0px;
  display:block;
  display: inline-block;
  min-width: 100%;
`;

const JavascriptCell = ({id,cellSettingsHandlerFunc}) => {

  const [editor,setEditor] = useState(null);
  const handleKeyDown = (event) =>{
    if (event.key === 'Enter' && event.shiftKey){
      event.preventDefault();
      console.log(typeof(editor.getValue()));
      console.log(editor.getValue());
    }
  }
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
    <CellField>
      <CellEditorSettings cellSettingsHandlerFunc = {cellSettingsHandlerFunc} id={`editorSettings${id}`}></CellEditorSettings>
      <EditorField onKeyDown={handleKeyDown} id={`editor${id}`}></EditorField>
    </CellField>
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
const CellEnvironmentHeader = ({addCodeCellFunc}) => {
  
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.name == "code"){
      addCodeCellFunc()
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

  const cellSettingsHandlerFuncGenerator = (id) => {
    return (function() {
      console.log(`length of cells ${cells.length}`);
      console.log(`Filtering out id ${id}`);
      let new_list = [...cells];
      new_list = new_list.filter(cellId => cellId != id);
      console.log(new_list);
      setCells(new_list);    
    });
  }

  useEffect(()=>{
    setCellList(createCellList(cells)); 
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
    <CellEnvironment>
        <CellEnvironmentHeader addCodeCellFunc={addCodeCellFunc}></CellEnvironmentHeader>
        {cellList}
    </CellEnvironment>
  )
}


export const Develop = () => {
  useEffect(()=>{
    document.body.style.backgroundColor = `${bodyBackgroundColor}`;
  });
  return (
    <DeveloperComponent></DeveloperComponent>
  )
};
