import React, { useState } from "react";
import "./UploadPhoto.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

function UploadPhoto() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);

  function handleChange(e) {
    // console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleSubmit = () => {
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="UploadPhoto">
      {/* <img src={file} /> */}
      <Avatar alt="Choose File" src={url} sx={{ width: 150, height: 150 }} />
      <input type="file" onChange={handleChange} />
      <br />
      <button onClick={handleSubmit}>UploadPhoto</button>
    </div>
  );
}
export default UploadPhoto;
