import React from 'react';
import Home from './pages/Home';
import LoginPage from "./pages/LoginPage"
import './App.css';
import SignUpPage from './pages/SignupPage';
import CartPage from './pages/cartPage';
import Checkout from './pages/Checkout';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home></Home>),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: <CartPage></CartPage>,
  },
  {
    path: "checkout",
    element: <Checkout></Checkout>,
  },
]);


  


function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
