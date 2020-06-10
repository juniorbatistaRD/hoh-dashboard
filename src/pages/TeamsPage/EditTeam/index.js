import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";
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
