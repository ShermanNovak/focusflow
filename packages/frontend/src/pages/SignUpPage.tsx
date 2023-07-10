import { Button, Checkbox, Form, Input } from "antd";
import React from 'react';
import logo from '../logo.svg';
import background from '../background.svg';
import "../index.css"

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export default function SignUpPage() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  

  
  const Footer = () => {
    return (
      <div className="container">
        <footer style={{ backgroundColor: '#828282', padding: '1px', textAlign: 'center' , width:'100%'}}>
          <h6 style={{fontWeight: "normal"}}>© 2023 FocusFlow. All rights reserved.</h6>
        </footer>
      </div>
    );
  };

  return (
    
    <div style={{backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
      <div className= "topnav">
        <img src={logo} alt="Logo" style={{ width: '2.5%',height: '2.5%', padding: '0px', float: 'left'}}/>
        <div style={{padding: '10px'}}>
            <a href="../signup" style={{margin: 'auto', textAlign: 'center'}}><b>FocusFlow</b></a>
            <a href="../about">About</a>
            <a href="../features">Features</a>
          <div style={{float: 'right'}}>
            <a href="../login">Login</a>
            <small>|</small>
            <a href="../signup">Sign up</a>
          </div>
        </div>
      </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <Form name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 32 }}
          style={{ maxWidth: 600 , width: 400}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        > 
        <img src={logo} alt="Logo" style={{ display:'flex', width:'100px', margin: 'auto', padding: '30px', paddingBottom: '0px'}}/>
        <h3 style={{textAlign:'center', paddingBottom:'30px'}}>FocusFlow</h3>
        <h3 style={{fontWeight: 'normal', padding: '0px'}}>Name</h3>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input type="text" placeholder="Enter your username" />
          </Form.Item>

          <h3 style={{fontWeight: 'normal'}}>Email</h3>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <h3 style={{fontWeight: 'normal'}}>Password</h3>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password type="password" placeholder="Enter your password"/>
          </Form.Item>

          <h3 style={{fontWeight: 'normal'}}>Confirm Password</h3>
          <Form.Item
            name="Confirm Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password type="password" placeholder="Enter your confirm password"/>
          </Form.Item>
      
          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
          <br></br>
          <Form.Item wrapperCol={{ offset: 0, span: 32 }} >
            <Button type="primary" htmlType="submit" style={{width:'400px',  backgroundColor: '#BEE2B5', color:'#000000', textAlign: "center", boxShadow: '0px 3px 1px rgba(0, 0, 0, 0.2)'}}>
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
    <Footer></Footer>
    </div>
  );
}
