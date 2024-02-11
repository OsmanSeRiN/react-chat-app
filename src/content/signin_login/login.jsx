import React, { useState } from 'react'
import "../styles.scss"
import AddImage from "../images/icons8-add-image-48.png"
import { auth } from '../../data/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Login() {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");  // Corrected to lowercase 'navigate'
        console.log(`email: ${email}  Password: ${password}`);
      } catch (err) {
        setErr(true);
      }
    };

    return (
      <div className='formContainer'>
        <div className="formWrapper">
          <span className='logo'>Tomato Chat</span>
          <span className='title'>Sign In</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='E-mail' name="" id="" />
            <input type="password" placeholder='password' name="" id="" />
            <button type="submit">Giriş Yap</button>
            {err && <span>Yanlış şifre ve ya e-posta girdiniz!</span>}
          </form>
          <p>Bir hesap oluştur? <Link to="/SingIn">Kaydol</Link> </p>
        </div>
      </div>
    );
  }

  export default Login;