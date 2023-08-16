import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Login, Register } from './auth/auth';
import { RoomList } from './room/roomlist';
import { Room } from './room/room';
import { Header } from './header/header';

const router = createBrowserRouter([
  {
    path : '/join',
    element :  <Register/>
  },
  {
    path : '/login',
    element :  <Login/>
  },
  {
    path : '/',
    element :  <RoomList/>
  },
  {
    path : '/room/:roomname',
    element : <Room/>
  }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='rootContainer'>
    <Header></Header>
    <RouterProvider router={router} ></RouterProvider>
  </div>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
