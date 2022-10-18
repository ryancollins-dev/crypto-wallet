import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import 'antd/dist/antd.min.css';
import './App.css';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const web3 = new Web3('ws://localhost:7545');

function App() {
  const [node, setNode] = useState('Unknown Node');

  web3.eth.getNodeInfo(function (error, result) {
    if (error) {
      console.error(error);
    } else {
      setNode(result);
    }
  });

  useEffect(() => {
    if (window.require) {
      const electron = window.require('electron');
      const ipcRenderer = electron.ipcRenderer;
      const showNodeInfo = (_, command) => {
        if (command === 'show-node-info') {
          window.alert(`Node: ${node}`);
        }
      };
      ipcRenderer.on('commands', showNodeInfo);
      return () => {
        ipcRenderer.Renderer.off('commands', showNodeInfo);
      };
    }
  }, [node]);

  return (
    <div className='App'>
      <Layout>
        <Header>{node}</Header>
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
