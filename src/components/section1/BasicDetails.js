import React, { useState } from "react";
import "./BasicDetails.css";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import UploadPhoto from "./UploadPhoto";
import { db } from "../../firebase";
// import { formGroupClasses } from "@mui/material";

const BasicDetails = ({ user, setUser, loading }) => {
  // const [user, setUser] = useState({
  //   name: "",
  //   email_id: "",
  //   short_bio: "",
  // });

  const [name, setName] = useState();
  const [emailId, setEmail] = useState();
  const [shortBio, setShortbio] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    if (name && emailId && shortBio) {
      try {
        const docRef = await updateDoc(collection(db, "users"), {
          name,
          email_id: emailId,
          short_bio: shortBio,
        });
        localStorage.setItem("email", emailId);
        setUser({
          name,
          email_id: emailId,
          short_bio: shortBio,
        });
        alert("Data stored");
        setIsEditing(false);
      } catch (e) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            name,
            email_id: emailId,
            short_bio: shortBio,
          });
          localStorage.setItem("email", emailId);
          setUser({
            name,
            email_id: emailId,
            short_bio: shortBio,
          });
          alert("Data stored");
          setIsEditing(false);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("All fields required");
    }
  };

  return (
    <div className="form">
      <UploadPhoto />
      {loading ? (
        <div>Data loading....</div>
      ) : user.name && user.email_id && user.short_bio && !isEditing ? (
        <div>
          <h2>{user.name}</h2>
          <h5 style={{ color: "grey" }}>{user.email_id}</h5>
          <div>{user.short_bio}</div>
          <button
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              marginTop: "1rem",
              fontSize: "1rem",
            }}
            onClick={() => {
              setIsEditing(true);
              setName(user.name);
              setEmail(user.email_id);
              setShortbio(user.short_bio);
            }}
          >
            Edit
          </button>
        </div>
      ) : (
        <>
          <form
            className="left_form"
            method="POST"
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "75%",
              }}
            >
              <div>
                <label>Name</label>
                <br />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <label>Email-ID</label>
                <br />
                <input
                  type="text"
                  name="email_id"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
              </div>
              <div>
                <label>Short Bio</label>
                <br />
                <input
                  type="text"
                  name="short_bio"
                  value={shortBio}
                  onChange={(e) => setShortbio(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" onClick={postData}>
              Save
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default BasicDetails;
