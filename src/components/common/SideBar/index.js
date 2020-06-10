import React, { useState } from "react";
import { Menu, Header, Icon, Button } from "semantic-ui-react";
import styles from "./index.module.css";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.container}>
      <Button style={{ width: 20, position: "absolute", top: 0 }}>
        <Icon name="bars" onClick={() => setIsOpen((prev) => !prev)} />
      </Button>
      {isOpen && (
        <>
          <Header style={{ marginTop: 50, color: "white" }}>HOH App</Header>
          <Menu fluid vertical pointing>
            <Link to="">
              <Menu.Item name="stats" active={location.pathname === "/app"}>
                <Icon name="line graph" />
                Stats
              </Menu.Item>
            </Link>
            <Link to="search">
              <Menu.Item
                name="search"
                active={location.pathname === "/app/search"}
              >
                <Icon name="search" />
                Search
              </Menu.Item>
            </Link>
            <Link to="houses">
              <Menu.Item
                name="home"
                active={location.pathname === "/app/houses"}
              >
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
        </>
      )}
    </div>
  );
};

export default SideBar;
