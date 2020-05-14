import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/common/SideBar";
import styles from "./index.module.css";
import { Grid, Segment, Container, Header, Icon } from "semantic-ui-react";
import Main from "../../layout/Main";

const Dashboard = () => {
  return (
    <Container>
      <Header as="h2">
        <Icon name="home" />
        <Header.Content>Houses</Header.Content>
      </Header>
    </Container>
  );
};

export default Dashboard;
