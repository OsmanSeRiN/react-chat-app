import React, { useState } from 'react'
import "../styles.scss"
import AddImage from "../images/icons8-add-image-48.png"
import { auth, db, storage } from '../../data/firebase';
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';



function Signin() {

  const [err, setErr] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log(`email : ${email}  Password: ${password}`);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password, displayName);

      const storageRef = ref(storage,`images/${displayName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: displayName,
              email: email,
              password: password,
              photoURL: downloadURL
            });

            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/")
          });
        }
      );
    } catch (err) {
      setErr(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">

        <span className='logo'>Tomato Chat</span>
        <span className='title'>Sing İn</span>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Name' name="" id="name" />
          <input type="email" placeholder='E-mail' name="" id="email" />
          <input type="password" placeholder='password' name="" id="password" />
          <input style={{ display: "none" }} type="file" placeholder='file' name="" id="file" />
          <label htmlFor="file">
            <img src={AddImage} alt="" />
            <span>Lütfen Bir Fotoğraf Yükleyiniz</span>
          </label>
          <button type="submit">Kaydol</button>
          {err && <span>Zaten bir hesabınız bulunmaktadır</span>}
        </form>

        <p>Zaten bir hesabın varsa? <Link to="/Login">Giriş Yap</Link> </p>
      </div>
    </div>
  )
}

export default Signin;
