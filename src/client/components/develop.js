/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

/*******************************************************
  DESCRIPTION
    Defines the basic developer page
    Uses redux store to maintain state of javascript cells
    Current implementation is an array but will need to change to
    tree-based hierarchy once the text cells are introduced to allow
    formatting of the page
*******************************************************/

/*******************************************************
  IMPORT STATEMENTS
*******************************************************/
import React,{useState,useEffect} from "react";
import {createStore} from "redux";
import styled from "styled-components";
import {JavascriptCell} from "./developer_subcomponents/JavascriptCell"
import {DeveloperContentHeader} from "./developer_subcomponents/DeveloperContentHeader"
import $ from "jquery";
import {MainTheme as Theme} from "./developer_subcomponents/DeveloperTheme"

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
const DeveloperEnvironment = styled.div`
  margin-top: 10px;
  margin-right: 20px;
  display: block;
  justify-content: left;
  grid-area: main;
  background: ${Theme.backgroundCodingField};
  height: auto;
  border: 1px solid ${Theme.borderColor};
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
  HELPER FUNCTIONS
  Mainly helper functions to manipulate a list in javascript
*******************************************************/

// helper function to create a cell ID
const createID = () => {return Math.random().toString(36).substring(7)};
// helper function to swap to elements of a list
const swap = (arr,i,j) => {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  return arr;
}
// helper function to remove element from list
const removeListItem = (list,id) => {
  let new_list = [...list];
  new_list = new_list.filter(cellId => cellId != id);
  return new_list;
}
// helper function to decrement index of list item
const moveListItemUp = (list,id) => {
  let new_list = [...list];
  let index = new_list.indexOf(id);
  if (index == -1){
    console.log('ERROR: Item doesn\'t exist...');
  } else {
     if (index != 0){
       new_list = swap(new_list,index,index-1)
     }
  }
  return new_list;
}
// helper function to increment index of list item
const moveListItemDown = (list,id)=>{
  let new_list = [...list];
  let index = new_list.indexOf(id);
  if (index == -1){
    console.log('ERROR: Item doesn\'t exist...');
  } else {
     if (index != new_list.length-1){
       new_list = swap(new_list,index,index+1)
     }
  }
  return new_list;
}
// helper function to add list item
const addListItem = (list) => {
  let new_id = createID();
  let new_list = [...list]
  new_list.push(new_id);
  return new_list;
}
/*******************************************************
  REDUX DEVELOPER STORE
*******************************************************/

// implement cell reducer for redux
const cellReducer = (state = {cellList:[createID()]}, action) => {
  switch(action.type){
    case 'DELETE':
      return {cellList: removeListItem(state.cellList,action.cellID)};
    case 'UP':
      return {cellList: moveListItemUp(state.cellList,action.cellID)};
    case 'DOWN':
      return {cellList: moveListItemDown(state.cellList,action.cellID)};
    case 'ADD':
      return {cellList: addListItem(state.cellList)};
    default:
      return state;
  }
};
let cellStore = createStore(cellReducer);


/*******************************************************
  COMPONENT DEFINITION
  Has a button to add a javascript cell currently
  Need to implement the text cell
*******************************************************/

export const Develop = () => {
  // make any necessary adjustments to default page
  useEffect(()=>{
    document.body.style.backgroundColor = `${Theme.bodyBackgroundColor}`;
    $( "#footer" ).remove();
  });

  const createCellList = (cell_list) => {
    return cell_list.map((id)=>{
      return (
        <JavascriptCell cellStore = {cellStore} key={id} id = {id}></JavascriptCell>
      )
    });
  }
  
  const [cellList,setCellList] = useState(createCellList(cellStore.getState().cellList));
  
  cellStore.subscribe(()=>{
    setCellList(createCellList(cellStore.getState().cellList));
    $('#DeveloperContent').scrollTop($('#DeveloperContent')[0].scrollHeight);
  })

  return (
    <DeveloperEnvironment>
        <DeveloperContentHeader cellStore={cellStore}></DeveloperContentHeader>
        <DeveloperContent id ="DeveloperContent">
          {cellList}
        </DeveloperContent>
    </DeveloperEnvironment>
  )
}
