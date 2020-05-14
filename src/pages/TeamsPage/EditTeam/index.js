import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import styles from "./index.module.css";
import { Grid, Segment, Container, Header, Icon } from "semantic-ui-react";
import EditTeamForm from "./EditTeamForm";

const EditTeam = () => {
  const { team } = useParams();
  return (
    <Container>
      <Container style={{ marginTop: 20 }}>
        <EditTeamForm team={team} />
      </Container>
    </Container>
  );
};

export default EditTeam;
