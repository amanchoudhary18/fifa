import React, { useState, useEffect } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { toast } from "react-toastify";

const RegistrationForm = ({
  formData,
  openForm,
  setFormData,
  formVisible,
  setFormVisible,
  getTeams,
}) => {
  const disabled =
    formData?.teamName == "" ||
    formData?.player1 == "" ||
    formData?.player2 == "" ||
    formData?.teamLevel == "";

  const closeForm = () => setFormVisible(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/team", formData);
      toast.success("Team Registered Successfully");
      setFormVisible(false);
      getTeams();
    } catch (error) {
      toast.error(error.message);
      setFormData({
        teamName: "",
        player1: "",
        player2: "",
        teamLevel: "",
        selectedLeague: null,
        selectedLogo: null,
      });
    }
  };

  return (
    <div className="registration-form">
      <div className="registration-button-container">
        <button className="registration-btn border" onClick={openForm}>
          Register
        </button>
      </div>

      {formVisible && (
        <div className="form-overlay" onClick={closeForm}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="form-title">Team Registration</h2>
            <form className="registration-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="teamName">Team Name</label>
                <input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="Enter team name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="player1">Player 1 Name</label>
                <input
                  type="text"
                  id="player1"
                  name="player1"
                  value={formData.player1}
                  onChange={handleChange}
                  placeholder="Enter player 1 name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="player2">Player 2 Name</label>
                <input
                  type="text"
                  id="player2"
                  name="player2"
                  value={formData.player2}
                  onChange={handleChange}
                  placeholder="Enter player 2 name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="teamLevel">Team Level</label>
                <select
                  id="teamLevel"
                  name="teamLevel"
                  value={formData.teamLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={disabled}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
