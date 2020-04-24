/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

/*******************************************************
  DESCRIPTION
    DEFINES THE JAVASCRIPT CELL COMPONENT
*******************************************************/

/*******************************************************
  IMPORT STATEMENTS
*******************************************************/
import React,{useState,useEffect} from "react";
import styled from "styled-components";
import ace from "../../../../ace-builds/src-noconflict/ace";
import "../../../../ace-builds/webpack-resolver";
import "../../../../ace-builds/src-noconflict/mode-javascript";
import "../../../../ace-builds/src-noconflict/theme-clouds"
import {MainTheme as Theme} from "./DeveloperTheme";
import $ from "jquery";
/*******************************************************
  CELL-EDITOR SUB-COMPONENT
    Each javascript cell has a few settings that can be manipulated
    This component encapsulates those settings and dispatches events
    to the main developer page store
*******************************************************/

const CellEditorSettingsContainer = styled.div`
  width: 140px;
  height: 20px;
  background: ${Theme.backgroundCodingField};
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
  background: ${Theme.backgroundCodingField};
  border: 1px solid ${Theme.borderColor};
  border-width: 0px 1px 0px 0px;
  &:hover {
    background: ${Theme.buttonHoverColor};
  }
`;

const CellEditorSettings = ({cellStore,id}) => {
  return (
    <CellEditorSettingsContainer>
      <CustomEditorSettingsButton onClick={()=> cellStore.dispatch({'type':'DELETE','cellID':id})}>Delete</CustomEditorSettingsButton>
      <CustomEditorSettingsButton onClick={()=> cellStore.dispatch({'type':'UP','cellID':id})}>Up</CustomEditorSettingsButton>
      <CustomEditorSettingsButton onClick={()=> cellStore.dispatch({'type':'DOWN','cellID':id})}>Down</CustomEditorSettingsButton>
    </CellEditorSettingsContainer>
  )
}

/*******************************************************
  STYLED TAGS
*******************************************************/

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
  border: 1px solid ${Theme.borderColor};
  border-width: 1px 1px 0px 1px;
`;

const OutputContainerMain = styled.div`
  padding:  0px;
  margin: 0px 0px 10px 0px;
  border: 1px solid ${Theme.borderColor};
  background: ${Theme.backgroundCodingField};
  min-width: 100%;
  font-size: 12px;
`

const OutputContainerInside = styled.div`
  margin-left: 39px;
  display: flex;
  flex-grow:1;
  border: 1px solid ${Theme.borderColor};
  border-width: 0px 0px 0px 1px;
  background: ${Theme.backgroundCodingField};
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
  background: ${Theme.backgroundCodingField};
  float:left;
  &:hover {
    background: ${Theme.buttonHoverColor};
  }
`;

const ExecuteButton = styled.button`
  margin-bottom: 2px;
  background: ${Theme.backgroundCodingField};
  border: 1px solid ${Theme.borderColor};
  float:left;
  &:hover {
    background: ${Theme.buttonHoverColor};
  }
`;
// A useful function
const StateReducerCreator = (UpdateState,Reducer) => {
  return (state,action)=>{
    let nextState = Reducer(state,action);
    UpdateState(nextState);
  }
};

const outputReducer = (state=``,action)=>{
  let nextState = state;
  switch(action.type){
    case 'CLEAR':
      nextState =  ``;
      break;
    case 'SET':
      nextState = action.output;
      $('#DeveloperContent').scrollTop($('#DeveloperContent')[0].scrollHeight);
      break;
    case 'APPEND':
      nextState = state + action.output;
      $('#DeveloperContent').scrollTop($('#DeveloperContent')[0].scrollHeight);
      break;
    default:
      break;
  };
  return nextState;
}
/*******************************************************
  COMPONENT DEFINITION
  The main javascript cell component definition
  Creates an ace Javascript editor that the user can type and submit code
*******************************************************/

export const JavascriptCell = ({id,cellStore}) => {

    const [editor,setEditor] = useState(null);
    const [cellOutput,setCellOutput] = useState('');
    const OutputStateReducer = StateReducerCreator(setCellOutput,outputReducer);

    const RunCode = () => {
      let state = `Simple Echoing command when Shift+Enter is pressed\n\n${editor.getValue()}`;
      let action = {'type':'SET','output':state};
      OutputStateReducer(state,action); 
    }
    const handleKeyDown = (event) =>{
      if (event.key === 'Enter' && event.shiftKey){
        event.preventDefault();
        RunCode();
      }
    }
  
    const clearOutput = (event) => {
      event.preventDefault();
      let state = ``;
      let action = {'type':'CLEAR'};
      OutputStateReducer(state,action); 
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
        <ExecuteButton onClick={RunCode}>Run</ExecuteButton>
        <CellEditorSettings cellStore = {cellStore} id={id}></CellEditorSettings>
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