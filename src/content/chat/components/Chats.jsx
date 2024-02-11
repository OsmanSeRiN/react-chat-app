import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../../../context/AuthContext'
import { db } from "../../../data/firebase"
import { ChatContext } from '../../../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  useEffect(() => {

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {

        setChats(doc.data())

      });

      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats()

  }, [currentUser.uid]);

  return (

    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>a[1].date - b[1].date).map((chat) => (
        <div className="userChat" onClick={() => handleSelect(chat[1].userInfo)} key={chat[0]}>
          {chat[1].userInfo && chat[1].userInfo.photoURL && (
            <>
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Chats;
