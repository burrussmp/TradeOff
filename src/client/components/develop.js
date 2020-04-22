/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

// import statements
import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import '../styles/develop.css'
// import ace IDE
import ace from "../../../ace-builds/src-noconflict/ace";
import "../../../ace-builds/webpack-resolver";
import "../../../ace-builds/src-noconflict/mode-javascript";
import "../../../ace-builds/src-noconflict/theme-clouds"
const LandingBase = styled.div`
  padding-top: 50px;
  display: inline-block;
  flex-grow: 0;
  justify-content: left;
  grid-area: main;
`;

const Styled_Header = styled.h2`
  font-size: 1.9em;
  text-align: left;
  font-family: "Roboto";
  font-style: italic;
  color: rgba(235, 235, 235,1);
  white-space: nowrap;
  margin: 0;
  letter-spacing: 2.5x;
`;

const Code_Container = styled.div`
  margin-top: 20px;
  margin-right:3px;
`

const EditorField = ({id}) => {
  const [editor,setEditor] = useState(null);
  const handleKeyDown = (event) =>{
    if (event.key === 'Enter' && event.shiftKey){
      event.preventDefault();
      console.log('Shift-Enter pressed');
      console.log(`${eval(editor.getValue())}`);
    } else {
    }
  }
  
  useEffect(()=>{
    let editor_new = ace.edit(document.getElementById(`editor${id}`));
    editor_new.setTheme("ace/theme/clouds");
    editor_new.getSession().setMode("ace/mode/javascript");
    editor_new.getSession().setUseWrapMode(true);
    editor_new.resize();
    editor_new.setOptions({minLines: 2});
    editor_new.setOptions({maxLines: 35});
    editor_new.setHighlightActiveLine(false);
    setEditor(editor_new)
  });

  return (
    <Code_Container onKeyDown={handleKeyDown} id={`editor${id}`}>
    </Code_Container>
  )
};

export const Develop = () => (
  <LandingBase>
      <Styled_Header>Developer page</Styled_Header>
      <EditorField id="1"></EditorField>
      <EditorField id="2"></EditorField>
      <EditorField id="3"></EditorField>
  </LandingBase>
);
