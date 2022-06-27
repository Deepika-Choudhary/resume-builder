import React, { useState } from "react";
import "./Education.css";
import Popup from "./Popup";
import "./Popup.css";
import { addDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const WorkExperience = (exp, setExp, loading) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [company, setCompany] = useState();
  const [role, setRole] = useState();
  const [startDate, setStartdate] = useState();
  const [desc, setDesc] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    if (company && role && startDate && desc) {
      try {
        const docRef = await updateDoc(collection(db, "experience"), {
          company,
          role,
          startDate,
          desc,
          email: localStorage.getItem("email"),
        });
        //  localStorage.setItem("email", emailId);
        setExp({
          company,
          role,
          startDate,
          desc,
        });
        alert("Data stored");
        setIsEditing(false);
      } catch (e) {
        try {
          const docRef = await addDoc(collection(db, "experience"), {
            company,
            role,
            startDate,
            desc,
            email: localStorage.getItem("email"),
          });
          //  localStorage.setItem("email", emailId);
          setExp({
            company,
            role,
            startDate,
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
        <input type="button" value="Work Experience()" onClick={togglePopup} />
        {loading ? (
          <div>Data loading....</div>
        ) : exp.company &&
          exp.role &&
          exp.startDate &&
          exp.desc &&
          !isEditing ? (
          <div>
            <h3>{exp.company}</h3>
            <h5>{exp.role}</h5>
            <h5>{exp.startDate}</h5>
            <h5>{exp.desc}</h5>

            <button
              onClick={() => {
                setIsEditing(true);
                setCompany(exp.company);
                setRole(exp.role);
                setStartdate(exp.startDate);
                setDesc(exp.desc);
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
                    <h3 className="heading">Add new work experience</h3>
                    <div className="edu">
                      <form className="Education" method="POST">
                        <label>Company</label>
                        <br />
                        <input
                          type="text"
                          name="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                        <br />
                        <label>Role</label>
                        <br />
                        <input
                          type="text"
                          name="role"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
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
      {/* <hr />
      <button className="add_btn">Add new</button> */}
    </div>
  );
};

export default WorkExperience;
