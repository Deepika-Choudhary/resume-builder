import React, { useState } from "react";
import "./Education.css";
import Popup from "./Popup";
import "./Popup.css";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Achievements = (ach, setAch, loading) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [title, setTitle] = useState();
  const [date, setDate] = useState();
  const [desc, setDesc] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    if (title && date && desc) {
      try {
        const docRef = await updateDoc(collection(db, "achievements"), {
          title,
          date,
          desc,
          email: localStorage.getItem("email"),
        });
        //  localStorage.setItem("email", emailId);
        setAch({
          title,
          date,
          desc,
        });
        alert("Data stored");
        setIsEditing(false);
      } catch (e) {
        try {
          const docRef = await addDoc(collection(db, "achievements"), {
            title,
            date,
            desc,
            email: localStorage.getItem("email"),
          });
          //  localStorage.setItem("email", emailId);
          setAch({
            title,
            date,
            desc,
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
    <div className="popups">
      <div className="btns">
        <input type="button" value="Achievements()" onClick={togglePopup} />

        {loading ? (
          <div>Data loading....</div>
        ) : ach.title && ach.date && ach.desc && !isEditing ? (
          <div>
            <h3>{ach.title}</h3>
            <h5>{ach.date}</h5>
            <h5>{ach.desc}</h5>

            <button
              onClick={() => {
                setIsEditing(true);
                setTitle(ach.title);
                setDate(ach.date);
                setDesc(ach.desc);
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <>
            {isOpen && (
              <Popup
                content={
                  <>
                    <h3 className="heading">Add new achievement</h3>
                    <div className="edu">
                      <form className="Education" method="POST">
                        <label>Title</label>
                        <br />
                        <input
                          type="text"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <label>Date</label>
                        <br />
                        <input
                          type="text"
                          name="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <br />
                        <label>Description</label>
                        <br />
                        <input
                          type="text"
                          className="desc"
                          name="desc"
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                        <br />
                        <button className="save_btn" onClick={postData}>
                          Save
                        </button>
                        <button className="cancel_btn">Cancel</button>
                      </form>
                    </div>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Achievements;
