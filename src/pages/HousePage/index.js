import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import ShowHouses from "./ShowHouses";
import AddHouse from "./AddHouse";
import ShowHouse from "./ShowHouse";
import EditHouse from "./EditHouse";

const HousePage = () => {
  return (
    <Container>
      <Header as="h2" style={{ margin: 10 }}>
        <Icon name="home" />
        <Header.Content>Houses</Header.Content>
      </Header>
      <Routes>
        <Route path="add" element={<AddHouse />} />
        <Route path="/" element={<ShowHouses />} />
        <Route path="/show/:id" element={<ShowHouse />} />
        <Route path="/edit/:id" element={<EditHouse />} />
      </Routes>
    </Container>
  );
};

export default HousePage;
