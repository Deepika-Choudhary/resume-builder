import "./App.css";
import Navbar from "./components/section1/Navbar";
import BasicDetails from "./components/section1/BasicDetails";
import MoreDetails from "./components/section2/MoreDetails";
import { useEffect, useState } from "react";
import { db } from "./firebase";

// import Index from "./components/realtimeData/Index";

// import Education from "./components/Education";
// import WorkExperience from "./components/WorkExperience";
// import Achievements from "./components/Achievements";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [user, setUser] = useState({
    name: "",
    email_id: "",
    short_bio: "",
  });
  const [edu, setEdu] = useState({
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
    desc: "",
  });
  const [ach, setAch] = useState({
    title: "",
    date: "",
    desc: "",
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;
    const getDB = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        usersSnapshot.forEach((doc) => {
          if (doc.data().email_id === email)
            setUser({
              name: doc.data().name,
              email_id: doc.data().email_id,
              short_bio: doc.data().short_bio,
            });
        });

        const eduSnapshot = await getDocs(collection(db, "education"));
        eduSnapshot.forEach((doc) => {
          if (doc.data().email_id === email)
            setEdu({
              inst: doc.data().inst,
              degree: doc.data().degree,
              startDate: doc.data().startDate,
              endDate: doc.data().endDate,
              desc: doc.data().desc,
            });
        });

        const expSnapshot = await getDocs(collection(db, "experience"));
        expSnapshot.forEach((doc) => {
          if (doc.data().email_id === email)
            setExp({
              company: doc.data().company,
              role: doc.data().role,
              startDate: doc.data().startDate,
              desc: doc.data().desc,
            });
        });

        const achSnapshot = await getDocs(collection(db, "achievements"));
        achSnapshot.forEach((doc) => {
          if (doc.data().email_id === email)
            setAch({
              title: doc.data().title,
              date: doc.data().date,
              desc: doc.data().desc,
            });
        });
        console.log(achSnapshot);
        console.log(expSnapshot);
        console.log(eduSnapshot);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getDB();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <BasicDetails user={user} setUser={setUser} loading={loading} />
      <MoreDetails
        loading={loading}
        edu={edu}
        experience={exp}
        achievement={ach}
      />

      {/* <Index /> */}
    </div>
  );
}

export default App;
