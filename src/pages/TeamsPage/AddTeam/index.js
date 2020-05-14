import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "./index.module.css";
import { Grid, Segment, Container, Header, Icon } from "semantic-ui-react";
import AddTeamForm from "./AddTeamForm";

const AddTeam = () => {
  return (
    <Container>
      <Container style={{ marginTop: 20 }}>
        <AddTeamForm />
      </Container>
    </Container>
  );
};

export default AddTeam;
