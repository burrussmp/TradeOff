/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

/*******************************************************
  DESCRIPTION
    A basic header with a link to the main page
*******************************************************/
"use strict";

/*******************************************************
  IMPORT STATEMENTS
*******************************************************/
import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoImg from "../../../../public/static/logo.png"



/*************************************************************************/
// STYLES
/*************************************************************************/
const LogoImgStyle = styled.img`
  height: auto;
  width: 200px;
  filter: drop-shadow(5px 5px 5px #222);
  padding: 5px;
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

const HeaderLeftBase = styled.div`
  display: inline-block;
  width: 200px;
  margin: 0;
`;

const HeaderBase = styled.div`
  display:flex;
  position: fixed;
  width: 100%;
  height: 75px;
  top:0;
  background: #28474b;
  border: 1px solid black;
  border-width: 0 0 1px 0;
`;

const HeaderMiddleBase = styled.div`
  padding-left: 35px;
  display: inline-block;
  margin: auto 0;
`;

/*************************************************************************/
// LEFT HEADER SUB-COMPONENT (LOGO)
/*************************************************************************/
const HeaderLeft = () => {
  return (
    <Link to={`/`} style={{ textDecoration: 'none' }}>
      <HeaderLeftBase>
        <LogoImgStyle src={LogoImg}></LogoImgStyle> 
      </HeaderLeftBase>
    </Link>
  );
};

/*************************************************************************/
// MIDDLE HEADER SUB-COMPONENT
/*************************************************************************/
const HeaderMiddle = () => {
  return (
    <HeaderMiddleBase>
      <Styled_Header>A Technology Consulting Firm for the Future</Styled_Header>   
    </HeaderMiddleBase>
  );
};

/*************************************************************************/
// MAIN HEADER COMPONENT
/*************************************************************************/
export const Header = () => (
  <HeaderBase>
    <HeaderLeft />
    <HeaderMiddle/>
  </HeaderBase>
);
