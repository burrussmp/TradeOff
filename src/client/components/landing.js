/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React,{useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header } from "./reusable/header";
import { Footer } from "./reusable/footer";
import Develop_Img from "../../../public/static/develop_logo.png"
import Discover_Img from "../../../public/static/discover_logo.png"
import Evolve_Img from "../../../public/static/evolve_logo.png"


/*************************************************************************/

const LandingBase = styled.div`
  padding-top: 50px;
  display: inline-block;
  flex-grow: 0;
  justify-content: left;
  grid-area: main;
`;

const Description = styled.h2`
    font-size: 2.5em;
    font-family: "Roboto";
    color: white;
    margin-top: 5px;
`;
const LogoImgStyle = styled.img`
  height: auto;
  vertical-align: top;
  width: 250px;
`;

const Content = styled.div`
    padding-top: 30px;
    padding-bottom: 20px;
    position: relative;
    text-align: center;
    width:90%;
    border: 2px solid #ffffff8a;
    border-width: 2px 0 2px 0;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
    
`

const DevelopDescription = `An online, community-based platform to empower, innovate, and develop open-source data visualizations for machine learning (ML) and artificial intelligence (AI) applications.`
const EvolveDescription = `Expert consultation service to provide customizable, real-time, cloud-based solutions that evolve as quickly as the world around us.`;
const DiscoverDescription = `A training program that believes technology should be accessible and drive everyone forward.`;

const Info = ({link_path,img,description}) =>  (
    <Link to={link_path} style={{ textDecoration: 'none' }}>
        <Content>
            <LogoImgStyle src={img}></LogoImgStyle>
            <Description>{description}</Description>
        </Content>
    </Link>
)

export const Landing = () => {
  useEffect(()=>{
    document.body.style.backgroundColor = '#00001a';
  });

  return (
    <>
      <LandingBase>
        <Info link_path={'/develop/'} img = {Develop_Img} description = {DevelopDescription}></Info>
        <Info link_path={'/evolve/'} img = {Evolve_Img} description = {EvolveDescription}></Info>
        <Info link_path={'/discover/'} img = {Discover_Img} description = {DiscoverDescription}></Info>
      </LandingBase>
      <Header/>
      <Footer/>
    </>
  )
};
