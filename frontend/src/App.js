import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;