import React from "react";
import { useParams } from "react-router-dom";
// import styles from "./index.module.css";
import { Container } from "semantic-ui-react";
import EditCommunityForm from "./EditCommunityForm";

const EditCommunity = () => {
  const { community } = useParams();
  return (
    <Container>
      <Container style={{ marginTop: 20 }}>
        <EditCommunityForm community={community} />
      </Container>
    </Container>
  );
};

export default EditCommunity;
