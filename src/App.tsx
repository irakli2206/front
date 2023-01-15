import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, styled } from '@nextui-org/react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chirp from './pages/Chirp';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {
  const AppContainer = styled('div', {
    maxHeight: '100vh',
    height: '100vh',
    width: '100%',
    // overflow: 'hidden'

  })


  return (
    <AppContainer className="App">
      <Header />

      {/* <Routes>
          <Route path='/' element={<Search />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />}  >
            <Route index element={<Account />} />
            <Route path='my-posts'  >
              <Route index element={<MyPosts />} />
              <Route path=':id' element={<Post />} />
            </Route>
            <Route path='bookmarks' element={<Bookmarks />} />
          </Route>
        </Routes> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:userhandle/profile' element={<Profile />} />
        <Route path='/posts/:postId' element={<Chirp />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>

    </AppContainer>
  );
}

export default App;
