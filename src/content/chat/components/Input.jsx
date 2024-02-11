import React, { useContext, useState } from 'react';
import Attach from "../../images/icons8-attach-48.png";
import Add from '../../images/icons8-add-image-48.png';
import { arrayUnion, updateDoc, doc, Timestamp, serverTimestamp } from '@firebase/firestore';
import { db, storage } from '../../../data/firebase';
import { AuthContext } from '../../../context/AuthContext';
import { ChatContext } from '../../../context/ChatContext';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
      //
      if (text || img) { // text veya img'den en az biri dolu ise
        if (img) {
          // Dosya adını belirle (örneğin, kullanıcının UID'si + timestamp)
          const fileName = currentUser.uid + "_" + Date.now();
          const storageRef = ref(storage, fileName);

          const uploadTask = uploadBytesResumable(storageRef, img);

          uploadTask.on('state_changed', () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            }).catch((error) => {
              console.error("Error getting download URL:", error);
            });
          });
        } else {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        }
        setText("");
        setImg(null);
      }

      //
  };

  return (
    <div className='input'>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Mesaj Gönder"
        name=""
        id=""
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          name=""
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Add} alt="" />
        </label>
        <button type="button" onClick={handleSend}>
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Input;
