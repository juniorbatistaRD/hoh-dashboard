import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Grid, Header } from "semantic-ui-react";
import LoginForm from "../../components/user/LoginForm";
import styles from "./index.module.css";

const LoginPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/app");
    }
  }, [currentUser, navigate]);

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh" }}
      verticalAlign="middle"
      className={styles.page}
    >
      <Grid.Column style={{ maxWidth: 450 }} className={styles.column}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>

        <LoginForm />
        {/* <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form> */}
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
