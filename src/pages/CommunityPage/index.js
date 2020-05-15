import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import ShowCommunity from "./ShowCommunity";
import AddCommunity from "./AddCommunity";
import EditCommunity from "./EditCommunity";

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
        <Route path="edit/:community" element={<EditCommunity />} />
      </Routes>
    </Container>
  );
};

export default CommunityPage;
