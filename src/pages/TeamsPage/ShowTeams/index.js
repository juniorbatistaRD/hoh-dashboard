import React, { useState, useEffect } from "react";
import {
  Table,
  Label,
  Menu,
  Icon,
  Container,
  Button,
  Header,
} from "semantic-ui-react";
import { getTeamsPagination, deleteTeam } from "../../../data/teams";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";

const ShowTeams = () => {
  const [teams, setTeams] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState(0);
  const [startFrom, setStartFrom] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getTeamsPagination({ startFrom, perPage }).then((data) => {
      setTeams(data.results);
      setItems(data.count);
    });
  }, [perPage, startFrom]);

  const goBack = () => {
    if (startFrom > 1) {
      setStartFrom((prev) => prev - 10);
    }
  };

  const goForward = () => {
    if (startFrom + perPage < items) {
      setStartFrom((prev) => prev + 10);
    }
  };

  const onDelete = (teamId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteTeam(teamId).then(() =>
          swal("The team has been deleted!" + willDelete, {
            icon: "success",
          })
        );
      }
    });
  };

  return (
    <Container>
      <Button primary onClick={() => navigate("addteam")}>
        Add Team
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Team's Leader</Table.HeaderCell>
            <Table.HeaderCell>Teams Members</Table.HeaderCell>
            <Table.HeaderCell>Place</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {teams.map((team) => (
            <Table.Row>
              <Table.Cell>
                <Header sub>{team.attributes.name}</Header>
              </Table.Cell>
              <Table.Cell>{team.attributes.teamLeader}</Table.Cell>
              <Table.Cell>{team.attributes.teamMembers}</Table.Cell>
              <Table.Cell>{team.attributes.placeIsFrom}</Table.Cell>
              <Table.Cell>
                <Label as="a" onClick={() => onDelete(team.id)}>
                  Delete
                  <Icon name="trash" color="red" />
                </Label>
                <Label as="a" onClick={() => navigate("edit/" + team.id)}>
                  Edit
                  <Icon name="edit" />
                </Label>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Menu floated="right" pagination>
                <Menu.Item
                  as="a"
                  icon
                  onClick={goBack}
                  disabled={startFrom < 1}
                >
                  <Icon name="chevron left" />
                </Menu.Item>

                <Menu.Item
                  as="a"
                  icon
                  onClick={goForward}
                  disabled={startFrom + perPage > items}
                >
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
};

export default ShowTeams;
