import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/common/SideBar";
import styles from "./index.module.css";
import { Routes, Route } from "react-router-dom";
import { Grid, Segment, Container, Header, Icon } from "semantic-ui-react";
import Main from "../../layout/Main";
import AddTeam from "./AddTeam";
import ShowTeams from "./ShowTeams";
import EditTeam from "./EditTeam";

const TeamsPage = () => {
  return (
    <Container>
      <Header as="h2" style={{ margin: 10 }}>
        <Icon name="group" />
        <Header.Content>Teams</Header.Content>
      </Header>
      <Routes>
        <Route path="/" element={<ShowTeams />} />
        <Route path="addteam" element={<AddTeam />} />
        <Route path="edit/:team" element={<EditTeam />} />
      </Routes>
    </Container>
  );
};

export default TeamsPage;
