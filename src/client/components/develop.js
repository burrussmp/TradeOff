/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React from "react";
import styled from "styled-components";

/*************************************************************************/

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

export const Develop = () => (
  <LandingBase>
      <Styled_Header> Developer page</Styled_Header>
  </LandingBase>
);
