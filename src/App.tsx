import React from 'react'
import './App.css'
import ContentArea from './component/ContentArea'
import Navbar from './component/Navbar'
import { initStorage } from './component/storage'

function App() {
  
  React.useEffect(() => {
    initStorage();
  },[]);

  return (
    <div className='w-screen h-screen overflow-auto bg-blue-600 flex flex-col items-center'>
      <Navbar></Navbar>
      <ContentArea></ContentArea>
    </div>
  )
}

export default App
