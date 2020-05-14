import React from "react";
import { Grid, Menu, Header, Icon } from "semantic-ui-react";
import styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.container}>
      <Header style={{ margin: 20, color: "white" }}>HOH App</Header>
      <Menu inverted vertical>
        <Link to="">
          <Menu.Item name="home" active={location.pathname === "/app"}>
            <Icon name="home" />
            Houses
          </Menu.Item>
        </Link>
        <Link to="teams">
          <Menu.Item
            name="group"
            active={location.pathname.includes("/app/teams")}
          >
            <Icon name="group" />
            Teams
          </Menu.Item>
        </Link>
        <Link to="communities">
          <Menu.Item
            name="pin"
            active={location.pathname.includes("/app/communities")}
          >
            <Icon name="pin" />
            Communitties
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  );
};

export default SideBar;
