"use strict";

// Necessary modules
import React, { Component } from "react";
import { render } from "react-dom";
import { Landing } from "./components/landing";
import { Header } from "./components/header";

import styled from "styled-components";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const GridBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hd"
    "main"
    "ft";

  @media (min-width: 500px) {
    grid-template-columns: 40px 50px 1fr 50px 40px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "hd hd hd hd hd"
      "sb sb main main main"
      "ft ft ft ft ft";
  }
`;

class MyApp extends Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            // <div>
            //     <p>
            //         Hello World!
            //     </p>
            // </div>
            <BrowserRouter>
              <GridBase>
                <Header/>
                <Route path="/" component={Landing} />
              </GridBase>
            </BrowserRouter>
        )
    }

}

render(<MyApp />, document.getElementById("mainDiv"));