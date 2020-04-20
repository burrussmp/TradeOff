/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React, { Fragment } from "react";
import styled from "styled-components";


/*************************************************************************/

// HEADER LEFT
/*************************************************************************/
const fontColor = "#00001a";

const FooterLeftBase = styled.div`
  width: 200px;
  padding: 0px;
  text-align: center;
  height: 100%;
  margin: 0 0;
`;

const CopyRight = styled.h2`
  font-size: 1.15em;
  font-family: "Roboto";
  color: ${fontColor};
  white-space: nowrap;
  padding-left: 20px;
  margin: 0 auto;
`;

const FooterInside = () => {
  return (
    <FooterLeftBase>
        <CopyRight>Copyright &copy; 2020 TradeOff. All rights reserved. Terms of Use | Privacy Policy</CopyRight>
    </FooterLeftBase>
  );
};

const FooterBase = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height:20px;
  background: #e0dfda;
  border: 1px solid white;
  border-width: 0 0 1px 0;
`;
export const Footer = () => (
  <FooterBase>
    <FooterInside/>
  </FooterBase>
);
