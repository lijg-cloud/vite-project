import React, { useEffect, useState } from 'react';
import { Layout, Menu, PageHeader } from 'antd';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Home from './views/Home';
import LeetCode from './views/LeetCode';
import Npm from './views/Npm';
import Other from './views/Other';
import { menus } from './config/menu';

import './app.less';

const { Header, Content } = Layout;

const App = () => {
  const navigate = useNavigate()

  const [selectdKey, setSelectdKey] = useState([''])

  useEffect(() => {
    const _selectdKey = localStorage.getItem('SELECTED_KEY') || '/'
    setSelectdKey([_selectdKey])
    navigate(_selectdKey)
  }, [])

  const handleSelect = (item: any) => {
    console.log(item)
    setSelectdKey(item.selectedKeys)
    navigate(item.key)
    localStorage.setItem('SELECTED_KEY', item.key)
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Menu
          mode="horizontal"
          selectedKeys={selectdKey}
          items={menus.map(menu => ({
            key: menu.link,
            label: menu.name,
          }))}
          onSelect={handleSelect}
          style={{ width: '100%' }}
        />
        <div className="logo">logo</div>
      </Header>
      <Content
        className="app-container"
        style={{
          padding: '0 50px',
          marginTop: 64,
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leetcode' element={<LeetCode />} />
          <Route path='/npm' element={<Npm />} />
          <Route path='/other' element={<Other />} />
        </Routes>
      </Content>
    </Layout>
  )
};

export default App;