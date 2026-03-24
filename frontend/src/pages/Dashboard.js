import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user = useMemo(() => {
    const raw = localStorage.getItem("alpUser");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const lastScore = localStorage.getItem("alpLastScore") || "Not available";

  const logout = () => {
    localStorage.removeItem("alpUser");
    navigate("/login");
  };

  return (

    <div className="dashboard-container">

      {/* Sidebar */}

      <div className="sidebar">

        <div className="profile-name">
          <img src="https://i.pravatar.cc/120" alt="profile"/>
          <h3>{user?.email || "Learner"}</h3>
        </div>

        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/skill-test")}>Skill Test</button>
        <button onClick={() => navigate("/planner")}>Planner</button>
        <button onClick={() => navigate("/progress")}>Progress</button>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>

      </div>


      {/* Main Content */}

      <div className="main-content">

        <div className="welcome-card">

          <div className="welcome-text">

            <h2>Welcome</h2>

            <h1>{user?.email || "Learner"}</h1>

            <p>Track your learning journey and improve your skills.</p>

            <div className="score-box">
              Last Skill Test Score : {lastScore}
            </div>

          </div>


          <div className="profile-image">
            <img src="https://i.pravatar.cc/200" alt="profile"/>
          </div>

        </div>


        <div className="footer">

          <p>© 2026 Analyzer Learner Planner</p>

          <p>Built with MERN Stack</p>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;