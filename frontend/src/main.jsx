import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from "react-router-dom";
import { Provider } from 'react-redux'
import Homepage from './pages/Homepage.jsx';
import Productscreen from './pages/Productscreen.jsx';
import store from './store.js';
import CartScreen from './pages/CartScreen.jsx';



const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
       <Route index={true} path='/' element={<Homepage />}/>  
       <Route path='/product/:id' element={<Productscreen/>}/>
       <Route path='/cart' element={<CartScreen/>}/>
    </Route>
  )
  
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)
