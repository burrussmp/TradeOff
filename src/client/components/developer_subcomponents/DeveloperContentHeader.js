/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

/*******************************************************
  DESCRIPTION
    Defines the header that stays on top of the field where
    code is entered in the developer page.
*******************************************************/

/*******************************************************
  IMPORT STATEMENTS
*******************************************************/
import React from "react";
import styled from "styled-components";
import {MainTheme as Theme} from "./DeveloperTheme"


/*******************************************************
  STYLED TAGS
*******************************************************/
const CustomCellEnvironmentHeader = styled.div`
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 30px;
    border: 1px solid ${Theme.borderColor};
    border-width: 0px 0px 1px 0px;
    display: flex;
    flex-direction: row;
`;

const CustomCellEnvironmentHeaderButton = styled.button`
    width: 50px;
    height: 100%;
    margin: 0px;
    padding: 0px;
    background: ${Theme.backgroundCodingField};
    border: 0px;
    &:hover {
    background: ${Theme.buttonHoverColor};
    }
`

/*******************************************************
  COMPONENT DEFINITION
  Has a button to add a javascript cell currently
  Need to implement the text cell
*******************************************************/

export const DeveloperContentHeader = ({cellStore}) => {
  
  const handleClick = (event) => {
    event.preventDefault();
    if (event.target.name == "code"){
      cellStore.dispatch({'type':'ADD'});
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