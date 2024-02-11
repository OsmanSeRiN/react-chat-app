import React, { useContext } from 'react'
import Messages from './messages'
import Add from "../../images/icons8-add-user-50.png"
import Camera from "../../images/icons8-video-camera-50.png"
import Menu from "../../images/icons8-menu-78.png"
import Input from './Input'
import { ChatContext } from '../../../context/ChatContext'

function Chat() {

  const {data} = useContext(ChatContext)
  return (
    <div className='chat'>
       <div className="chatInfo">
         <span>{data.user.displayName}</span>
         <div className="chatIcons">
            <img src={Camera} alt="" />
            <img src={Add} alt="" />
            <img src={Menu} alt="" />
         </div>
       </div>
       <Messages/>
       <Input/>
    </div>
  )
}

export default Chat