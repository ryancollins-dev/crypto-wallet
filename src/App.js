import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import 'antd/dist/antd.min.css';
import './App.css';
import { Layout, Tree } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
const { TreeNode } = Tree;
const web3 = new Web3('ws://localhost:7545');

function App() {
  const [node, setNode] = useState('Unknown Node');
  const [accounts, setAccounts] = useState([]);

  web3.eth.getNodeInfo(function (error, result) {
    if (error) {
      console.error(error);
    } else {
      setNode(result);
    }
  });

  useEffect(() => {
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      } else {
        setAccounts(accounts);
      }
    });
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

  const formatAccountName = (name) => {
    if (name && name.length > 10) {
      return `${name.substring(0, 10)}...`;
    }
    return 'Noname';
  };

  return (
    <div className='App'>
      <Layout>
        <Header>{node}</Header>
        <Layout>
          <Sider>
            <Tree>
              <TreeNode title='Accounts' key='accounts'>
                {accounts.map((account) => (
                  <TreeNode
                    key={account}
                    title={formatAccountName(account)}
                  ></TreeNode>
                ))}
              </TreeNode>
            </Tree>
          </Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
