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

import ProductDetailsPage from './pages/ProductDetailsPage';

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
  {
    path: "product-details/:id",
    element: <ProductDetailsPage></ProductDetailsPage>
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
