/* Copyright M. Burruss 2020 - All rights reserved */
"use strict";

/*******************************************************
  DESCRIPTION
    This will be a large file but ultimately good because all
    APIs for the client will exist here... before designing a new API
    one should consider what is already here and then make
    a new one if necessary. Note: Modifying one is dangerous as it
    can break others so be careful. The goal of the API is to get the information
    handling the API information can be done by each component so this
    should be relatively simple behavior such as error code etc.
    
    Steps to adding an API
        1. Look through current existing APIs
        2. If necessary, define a new API
        3. Ensure that all error codes that the server could
            send are handled by checking the server API
        4. Let components to data cleaning, parsing, etc. this is 
            just to get the data and send data
        5. Update the ClientAPI object at the bottom of the page.
*******************************************************/

/**
 * @name SubmitCode
 * @param {code} String Unformatted string containing the code to execute.
**/
const SubmitCode = (code) => {
    fetch("/v1/develop", {
      method: "POST",
      body: JSON.stringify({"code": code}),
      headers: {
        "content-type": 'application/json' 
      }
    }).then(res=>{
      if (res.ok){
        console.log('Successfully sent data');
      } else res.json().then(error => console.log(error));
    })
  }

export const ClientAPI = {
    SubmitCode: SubmitCode
  };