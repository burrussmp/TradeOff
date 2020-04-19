/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

// LOAD ANY ASSETS
/*************************************************************************/
import LogoImg from "../../../public/static/logo.png"



/*************************************************************************/

// STYLES
/*************************************************************************/
const LogoImgStyle = styled.img`
  height: auto;
  width: 25%;
  filter: drop-shadow(5px 5px 5px #222);
  padding: 15px;
`;

const HeaderBase = styled.div`
  grid-area: hd;
  display: flex;
  background: #e0dfda; 
`;

const Styled_Header = styled.h2`
  font-size: 1.5em;
  text-align: left;
  font-family: "Roboto";
  font-style: italic;
  color: ${fontColor};
  position:relative;
`;

// HEADER LEFT
/*************************************************************************/
const fontColor = "#00001a";

const HeaderLeftBase = styled.div`
  flex-grow: 2;
  flex-direction: row;\
`;

const HeaderLeft = () => {
  return (
    <HeaderLeftBase>
      <span>
      <LogoImgStyle src={LogoImg}></LogoImgStyle>
      <Styled_Header>A Technology Consulting Firm for the Future</Styled_Header>
      </span>
    
    </HeaderLeftBase>
  );
};

// HEADER MIDDLE
/*************************************************************************/


const HeaderMiddleBase = styled.div`
  flex-grow: 1;
  flex-direction: row;
`;
const HeaderMiddle = () => {
  return (
    <HeaderMiddleBase>
      
    </HeaderMiddleBase>
  );
};



/*******************************************************************/



export const Header = () => (
  <HeaderBase>
    <HeaderLeft />
    <HeaderMiddle/>
  </HeaderBase>
);
