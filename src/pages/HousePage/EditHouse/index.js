import React from "react";
import { Container } from "semantic-ui-react";
import EditHouseForm from "./EditHouseForm";
import { useParams } from "react-router";

const EditHouse = () => {
  const { id } = useParams();
  return (
    <Container>
      <Container style={{ marginTop: 20 }}></Container>
      <EditHouseForm houseId={id} />
    </Container>
  );
};

export default EditHouse;
