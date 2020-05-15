import React from "react";
import { Container } from "semantic-ui-react";
import AddCommunityForm from "./AddCommunityForm";

const AddTeam = () => {
  return (
    <Container>
      <Container style={{ marginTop: 20 }}>
        <AddCommunityForm />
      </Container>
    </Container>
  );
};

export default AddTeam;
