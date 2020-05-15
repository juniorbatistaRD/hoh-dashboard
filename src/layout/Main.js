import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";
import SideBar from "../components/common/SideBar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import styles from "./index.module.css";
import TeamsPage from "../pages/TeamsPage";
import CommunityPage from "../pages/CommunityPage";
const Main = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teams/*" element={<TeamsPage />} />
          <Route path="/communities/*" element={<CommunityPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
