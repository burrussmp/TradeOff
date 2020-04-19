/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React from "react";
import styled from "styled-components";

/*************************************************************************/

const LandingBase = styled.div`
  display: flex;
  justify-content: center;
  grid-area: main;
`;

export const Landing = () => (
  <LandingBase>
    <h1>This is my landing page!</h1>
    <h3>Please grade...HTTPS, results page working, register and login with Oauth, autocomplete,recognizing end of game</h3>
  </LandingBase>
);
