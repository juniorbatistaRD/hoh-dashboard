import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import CommunityMap from "../../components/common/CommunityMap";
import HousesByMonth from "../../components/stats/HousesByMonth";

const Dashboard = () => {
  return (
    <Container>
      <Header as="h2">
        <Icon name="home" />
        <Header.Content>Stats</Header.Content>
      </Header>
      <HousesByMonth />
      <Header>Communities</Header>

      <CommunityMap />
    </Container>
  );
};

export default Dashboard;
