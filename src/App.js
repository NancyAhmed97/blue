import React from 'react'
import MainRoute from './MainRoute'
import "./App.css"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='App'>
      <MainRoute/>
            <ToastContainer />

    </div>
  )
}

export default App
