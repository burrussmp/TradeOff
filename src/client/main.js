"use strict";

// Necessary modules
import React, { Component } from "react";
import { render } from "react-dom";
import { Landing } from "./components/landing";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Develop } from "./components/develop";

import styled from "styled-components";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const GridBase = styled.div` 
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 85px auto
  grid-template-areas:
    "hd"
    "main";

  @media (min-width: 500px) {
    grid-template-columns: 40px 50px 1fr 50px 40px;
    grid-template-rows: 85px auto;
    grid-template-areas:
      "hd hd hd hd hd"
      "sb sb main main main"
  }
`;

class MyApp extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <BrowserRouter>
              
              <GridBase>
                <Route exact path="/" component={Landing} />
                <Route path ='/develop' component = {Develop} />
              </GridBase>
              <Header/>
              <Footer/>
            </BrowserRouter>
        )
    }
}
render(<MyApp />, document.getElementById("mainDiv"));