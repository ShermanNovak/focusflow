import { Button, Checkbox, Form, Input } from "antd";
import logo from '../logo.svg';
import background from '../background2.svg';
import laptop from '../laptop.svg'
import "../index.css"
import {Auth0Provider} from "@auth0/auth0-react";
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import {useAuth0} from '@auth0/auth0-react';
import { useUserContext } from "../context/UserContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || '';

export default function LoginPage() {
  
  const {loginWithRedirect, user} = useAuth0();
  const { updateUser } = useUserContext();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (user) {
      updateUser({ userId: user.sub });
    }
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  

  
  const Footer = () => {
    return (
      <div className="container">
        <footer style={{ backgroundColor: '#828282', padding: '0.5px', textAlign: 'center' , width:'99.8%', overflow: 'hidden', marginTop: 'auto', marginBottom:'0px', paddingBottom:'0px'}}>
          <h6 style={{fontWeight: "normal"}}>© 2023 FocusFlow. All rights reserved.</h6>
        </footer>
      </div>
    );
  };

  return (
    <body>
    <div className="w-100 h-100" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', height:'100%'}}>
      <div className= "topnav">
        <img src={logo} alt="Logo" style={{ width: '2.5%',height: '2.5%', padding: '0px', float: 'left'}}/>
        <div style={{padding: '10px'}}>
            <a href="../login" style={{margin: 'auto', textAlign: 'center'}}><b>FocusFlow</b></a>
          <div style={{float: 'right'}}>
          </div>
        </div>
      </div>
        <div style={{ display: 'block', alignItems: 'left', justifyContent: 'center', }}>
        <img src={logo} alt="Logo" style={{ display:'flex', width:'100px', margin: 'auto', padding: '30px', paddingBottom: '0px'}}/>
        <h3 style={{textAlign:'center', paddingBottom:'15px', marginTop:'5px'}}>FocusFlow</h3>
        <div className="object-right">
          <img className="object-right" src={laptop} style={{width: '50%', float: 'right'}}/>
        </div>
        <div style={{marginBottom:'0px', marginLeft:'20%', marginRight:'50%'}}>
        <h1 style={{marginBottom:'0px', marginTop:'0px'}}>Productivity Application Just For You</h1>
        <h3 style={{fontWeight: 'normal', color:'#616161'}}> We designed to empower individuals in achieving their goals, 
        managing their time effectively, and maintaining a healthy work-life balance. 
        This all-in-one solution combines essential productivity tools with 
        personalized features to ensure that you stay focused, motivated, and organized throughout your day.</h3>
        <h3 style={{fontWeight: 'normal', padding: '0px', margin: '0px'}}> Start your journey today</h3>
          <br></br>
            <Button onClick={() => loginWithRedirect()} type="primary" htmlType="submit" style={{width:'100px',  backgroundColor: '#404040', color:'#FFFFFF', textAlign: "center", boxShadow: '0px 3px 1px rgba(0, 0, 0, 0.2)', borderRadius: '20px', }}>
              <b>Sign in &gt;</b>
            </Button>
          </div>
      </div>
    <Footer></Footer>
    </div>
    </body>
  );
}