import React, { useState } from "react";
import "./Education.css";
import Popup from "./Popup";
import "./Popup.css";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Education = (education, setEducation, loading) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [inst, setInst] = useState();
  const [degree, setDegree] = useState();
  const [startDate, setStartdate] = useState();
  const [endDate, setEnddate] = useState();
  const [desc, setDesc] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    if (inst && degree && startDate && endDate && desc) {
      try {
        const docRef = await updateDoc(collection(db, "education"), {
          inst,
          degree,
          startDate,
          endDate,
          desc,
          email: localStorage.getItem("email"),
        });
        //  localStorage.setItem("email", emailId);
        setEducation({
          inst,
          degree,
          startDate,
          endDate,
          desc,
        });
        alert("Data stored");
        setIsEditing(false);
      } catch (e) {
        try {
          const docRef = await addDoc(collection(db, "education"), {
            inst,
            degree,
            startDate,
            endDate,
            desc,
            email: localStorage.getItem("email"),
          });
          //  localStorage.setItem("email", emailId);
          setEducation({
            inst,
            degree,
            startDate,
            endDate,
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
        <input type="button" value="Education()" onClick={togglePopup} />

        {loading ? (
          <div>Data loading....</div>
        ) : education.inst &&
          education.degree &&
          education.startDate &&
          education.endDate &&
          education.desc &&
          !isEditing ? (
          <div>
            <h3>{education.inst}</h3>
            <h5>{education.degree}</h5>
            <h5>{education.startDate}</h5>
            <h5>{education.endDate}</h5>
            <h5>{education.desc}</h5>

            <button
              onClick={() => {
                setIsEditing(true);
                setInst(education.inst);
                setDegree(education.degree);
                setStartdate(education.startDate);
                setEnddate(education.endDate);
                setDesc(education.desc);
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
                    <h3 className="heading">Add new education</h3>
                    <div className="edu">
                      <form className="Education" method="POST">
                        <label>Institute</label>
                        <br />
                        <input
                          type="text"
                          name="inst"
                          value={inst}
                          onChange={(e) => setInst(e.target.value)}
                        />
                        <br />
                        <label>Degree</label>
                        <br />
                        <input
                          type="text"
                          name="degree"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                        />
                        <br />
                        <label>Start Date</label>
                        <br />
                        <input
                          type="text"
                          name="startDate"
                          value={startDate}
                          onChange={(e) => setStartdate(e.target.value)}
                        />
                        <br />
                        <label>End Date</label>
                        <br />
                        <input
                          type="text"
                          name="endDate"
                          value={endDate}
                          onChange={(e) => setEnddate(e.target.value)}
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

export default Education;
