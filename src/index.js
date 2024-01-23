import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./style/reset.scss";
import "./style/style.scss";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Basket from "./pages/Basket";
import Product from "./pages/Products";
import { store } from './store';
import { Provider } from 'react-redux';
import CardPage from './pages/CardPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Product />,
    loader: async () => {
      const user = JSON.parse(localStorage.getItem('registered'));
      if (user === false) {
        throw redirect("/login");
      }
      return user;
    },
  },
  {
    path: "/basket",
    element: <Basket />,
    loader: async () => {
      const user = JSON.parse(localStorage.getItem('registered'));
      if (!user) {
        throw redirect("/login");
      }
      return user;
    }
  },
  {
    path: "/card/:id",
    element: <CardPage />,
    loader: async () => {
      const user = JSON.parse(localStorage.getItem('registered'));
      if (!user) {
        throw redirect("/login");
      }
      return user;
    }
  },
  {
    path: "/login",
    element: <LoginPage />,
    loader: async () => {
      const user = JSON.parse(localStorage.getItem('registered'));
      if (user) {
        throw redirect("/*");
      } 
      return user;
    }
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
