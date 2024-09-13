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
import Protected from './features/auth/components/Protected';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected>
      <Home></Home>
    </Protected>,
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
    element: <Protected>
      <CartPage></CartPage>
    </Protected>,
  },
  {
    path: "checkout",
    element: <Protected>
      <Checkout></Checkout>
      </Protected>,
  },
  {
    path: "product-details/:id",
    element: <Protected>
      <ProductDetailsPage></ProductDetailsPage>
    </Protected>
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
