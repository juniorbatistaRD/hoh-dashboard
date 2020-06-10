import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import ShowCommunity from "./ShowCommunity";
import AddCommunity from "./AddCommunity";
import EditCommunity from "./EditCommunity";
import ShowOneCommunity from "./ShowOneCommunity";

const CommunityPage = () => {
  return (
    <Container>
      <Header as="h2" style={{ margin: 10 }}>
        <Icon name="group" />
        <Header.Content>Communitties</Header.Content>
      </Header>
      <Routes>
        <Route path="/" element={<ShowCommunity />} />
        <Route path="add" element={<AddCommunity />} />
        <Route path="show/:id" element={<ShowOneCommunity />} />
        <Route path="edit/:community" element={<EditCommunity />} />
      </Routes>
    </Container>
  );
};

export default CommunityPage;
