import React, { useContext, useState } from 'react'
import { collection, doc, getDocs, getDoc, query,  serverTimestamp, setDoc, updateDoc, where } from '@firebase/firestore'
import {db} from "../../../data/firebase"
import {AuthContext} from "../../../context/AuthContext"

function Search() {
  const [user,setUser] = useState(null)
  const [userName,setUserName] = useState("")
  const [err,setErr] = useState(false)
  const {currentUser} = useContext(AuthContext)

  const userSearch = (e) => {
    const updatedUserName = e.target.value;
    setUserName(updatedUserName);
  };




  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName));
    try {
      setErr(false);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };




  const handleKey = (e) =>{
    e.code === "Enter" && handleSearch();
  }

  const handleClick = async () =>{
     const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
     try{

      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()){
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"] :{
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
         });

         await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"] :{
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
         });

      };
     }catch(err){
         setUser(null);
         setUserName("")
     }
     setUser(null);
     setUserName("")
  }

  return (
    <div className="search">
        <div className="searchForm">
          <input type="text" placeholder='Kullanıcı ara' name="" id="" onChange={userSearch} onKeyDown={handleKey} value={userName}/>

        </div>
        {err && <span>Kullanıcı bulunamadı!</span>}
        {user &&
          <div className="userChat" onClick={handleClick}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
             <span>
               {user.displayName}
             </span>
          </div>
       </div>
        }
    </div>
  )
}

export default Search