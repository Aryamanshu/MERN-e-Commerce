import React, { useEffect } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import SignUpPage from "./pages/SignupPage";
import CartPage from "./pages/cartPage";
import Checkout from "./pages/Checkout";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from './features/auth/components/ProtectedAdmin'

import { useDispatch } from "react-redux";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/orderSuccessPage";
import UserOrderPage from "./pages/UserOrderPage,";
import UserProfilePage from "./pages/UserProfilePage";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";

import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import LogOut from "./features/auth/components/logout";

import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
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
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "product-details/:id",
    element: (
      <Protected>
        <ProductDetailsPage></ProductDetailsPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-details/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailsPage></AdminProductDetailsPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-Success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: '/logout',
    element: <LogOut></LogOut>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
