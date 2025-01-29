import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import axios from "axios";
import ReactPlayer from "react-player";

const Hero = ({ getTeams, teams, setTeams }) => {
  const [fixtures, setFixtures] = useState([]);
  const playerRef = useRef(null);

  useEffect(() => {
    getTeams();
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.seekTo(3, "seconds");
      }
    }, 500);
  }, []);

  return (
    <div className="hero-container">
      <div className="img-container border">
        <ReactPlayer
          url="/trailer.mp4"
          ref={playerRef}
          playing={true}
          muted={true}
          onPlay={() => console.log("Video is playing")}
          onError={(e) => console.log("Error loading video", e)}
          width="100%"
          height="100%"
          onProgress={({ playedSeconds }) => {
            if (playedSeconds >= 105) {
              playerRef.current.seekTo(3, "seconds");
            }
          }}
        />
      </div>
      {/* <div className="fixtures-container border">
        <p className="text-secondary fw-bold m-0">UPCOMING FIXTURES</p>
        <div className="fixtures">
          {fixtures?.length > 0 && (
            <div className="fixture">
              <div className="fixture-header">
                <div></div>
                <div className="next-up fw-bold">Next Up</div>
              </div>
              <div className="fixture-teams">
                {" "}
                <div className="fixture-team">
                  <p className="text-white">{fixtures[0].team1.name}</p>
                </div>
                <p className="text-white fw-bold">VS</p>
                <div className="fixture-team">
                  <p className="text-white">{fixtures[0].team2.name}</p>
                </div>
              </div>
            </div>
          )}

          <div className="seperator"></div>

          {fixtures.length > 0 &&
            fixtures.splice(0, 1).map((fixture, index) => (
              <div className="fixture" key={index}>
                <div className="fixture-teams">
                  <div className="rest-fixture-team">
                    <p className="text-white">{fixture.team1.name}</p>
                  </div>
                  <p className="seperator-vertical"></p>
                  <div className="rest-fixture-team">
                    <p className="text-white">{fixture.team2.name}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}
      <div className="teams-container border">
        <p className="text-secondary fw-bold m-0">TEAMS</p>
        <div className="teams">
          {teams.map((team, index) => (
            <div className="team" key={index}>
              <p className="text-secondary fw-bold">{team.teamName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
