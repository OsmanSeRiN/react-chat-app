import React, { useContext } from 'react'
import Tomato from "../../images/Tomato.png"
import { signOut } from 'firebase/auth'
import { auth } from '../../../data/firebase'
import { AuthContext } from '../../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

function Navbar() {

  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/")
      // Çıkış başarılı
    } catch (error) {
      // Hata durumunda işlemler
      console.error('Çıkış yapılırken bir hata oluştu:', error);
      console.log(currentUser.name)
    }
  };

  return (
    <div className='navbar'>
        <span className="logo">
          <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <span>{currentUser.displayName}</span>
            <button type="submit" onClick={handleSignOut}>Logout</button>
          </div>
        </span>
    </div>
  )
}

export default Navbar