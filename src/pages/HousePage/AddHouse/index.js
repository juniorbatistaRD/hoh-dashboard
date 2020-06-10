import React from "react";
import { Container } from "semantic-ui-react";
import AddHouseForm from "./AddHouseForm";

const AddTeam = () => {
  return (
    <Container>
      <Container style={{ marginTop: 20 }}>
        <AddHouseForm />
      </Container>
    </Container>
  );
};

export default AddTeam;
