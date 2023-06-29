import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound';
import AllProducts from './pages/AllProducts';
import Home from './pages/Home';
import MyCart from './pages/MyCart';
import ProductDetail from './pages/ProductDetail';
import NewProducts from './pages/NewProducts';



const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {index: true, path: '/', element: <Home /> },
      {path: '/products', element: <AllProducts />},
      {path: '/products/new', element: <NewProducts />},
      {path: '/products/:id', element: <ProductDetail />},
      {path: '/carts', element: <MyCart />}
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
