import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import { ToastContainer } from "react-toastify";
import axios from "axios";

function App() {
  const [formVisible, setFormVisible] = useState(false);
  const [teams, setTeams] = useState([]);
  const [formData, setFormData] = useState({
    teamName: "",
    player1: "",
    player2: "",
    teamLevel: "",
    selectedLeague: null,
    selectedLogo: null,
  });

  const openForm = () => {
    setFormData({
      teamName: "",
      player1: "",
      player2: "",
      teamLevel: "",
      selectedLeague: null,
      selectedLogo: null,
    });
    setFormVisible(true);
  };

  const getTeams = async () => {
    try {
      const response = await axios.get("/api/teams");
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-primary container">
      <ToastContainer />
      <Navbar openForm={openForm} />
      <Hero teams={teams} setTeams={setTeams} getTeams={getTeams} />

      <div className="hero-text">
        Are you ready to take your FIFA skills to the next level? Whether you're
        a pro or just looking to have a blast, this is the tournament for you!
        Get your game face on, join the competition, and show us what you've
        got! Sign up now for a chance to prove you're the ultimate FIFA champion
        and claim your spot at the top! It's time to play, compete, and own the
        game! Let the tournament begin!
      </div>

      <RegistrationForm
        formData={formData}
        setFormData={setFormData}
        openForm={openForm}
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        getTeams={getTeams}
      />
    </div>
  );
}

export default App;
