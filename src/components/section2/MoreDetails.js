import React, { useEffect, useState } from "react";
import "./MoreDetails.css";
import "./Education.css";
import Education from "./Education.js";
import WorkExperience from "./WorkExperience";
import Achievements from "./Achievements";
// import Popup from "reactjs-popup";
import Popup from "./Popup";
import "./Popup.css";

const MoreDetails = ({ loading, edu, experience, achievement }) => {
  const [education, setEducation] = useState({
    inst: "",
    degree: "",
    startDate: "",
    endDate: "",
    desc: "",
  });

  const [exp, setExp] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    desc: "",
  });

  const [ach, setAch] = useState({
    title: "",
    date: "",
    desc: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (edu) {
      setEducation({
        inst: edu.inst,
        degree: edu.degree,
        startDate: edu.startDate,
        endDate: edu.endDate,
        desc: edu.desc,
      });
    }
    if (exp) {
      setExp({
        company: exp.company,
        role: exp.role,
        startDate: exp.startDate,
        endDate: exp.endDate,
        desc: exp.desc,
      });
    }
    if (ach) {
      setAch({
        title: ach.title,
        date: ach.date,
        desc: ach.desc,
      });
    }
    return;
  }, [edu, experience, achievement]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="MoreDetails">
        <Education
          education={education}
          setEducation={setEducation}
          loading={loading}
        />
        <WorkExperience exp={exp} setExp={setExp} loading={loading} />
        <Achievements ach={ach} setAch={setAch} loading={loading} />
      </div>
      <hr />
      <button className="addBtn">Add new</button>
    </>
  );
};

export default MoreDetails;
