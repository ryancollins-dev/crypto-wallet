import React from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Layout } from 'antd';
import Web3 from 'web3';
const web3 = new Web3('ws://localhost:7545');
const { Header, Footer, Sider, Content } = Layout;

function App() {
  console.log(web3);
  return (
    <div className='App'>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
