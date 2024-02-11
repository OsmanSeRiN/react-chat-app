import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
import React from 'react'

function Home() {
  return (
    <div className="home">
      <div className="container">
         <Sidebar/>
         <Chat/>
      </div>
    </div>
  )
}

export default Home