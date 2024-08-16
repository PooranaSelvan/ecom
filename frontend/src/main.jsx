import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import products from './products.js';
import Productscreen from './pages/Productscreen.jsx';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
       <Route index={true} path='/' element={<Homepage />}/>  
       <Route path='/product/:id' element={<Productscreen/>}/>  
    </Route>
  )
  
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
