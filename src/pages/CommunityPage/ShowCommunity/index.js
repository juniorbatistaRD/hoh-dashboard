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
import {
  getCommunittiesPagination,
  deleteCommunity,
} from "../../../data/community";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";

const ShowCommunity = () => {
  const [items, setItems] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [startFrom, setStartFrom] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCommunittiesPagination({ startFrom, perPage }).then((data) => {
      setItems(data.results);
      setItemsAmount(data.count);
    });
  }, [perPage, startFrom]);

  const goBack = () => {
    if (startFrom > 1) {
      setStartFrom((prev) => prev - 10);
    }
  };

  const goForward = () => {
    if (startFrom + perPage < itemsAmount) {
      setStartFrom((prev) => prev + 10);
    }
  };

  const onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteCommunity(id).then(() =>
          swal("The item has been deleted!" + willDelete, {
            icon: "success",
          })
        );
      }
    });
  };

  return (
    <Container>
      <Button primary onClick={() => navigate("add")}>
        Add Community
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Police Station</Table.HeaderCell>
            <Table.HeaderCell>Clinic</Table.HeaderCell>
            <Table.HeaderCell>School</Table.HeaderCell>
            <Table.HeaderCell>Church</Table.HeaderCell>
            <Table.HeaderCell>Grocery Store</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((community) => (
            <Table.Row key={community.id}>
              <Table.Cell>
                <Header sub>{community.attributes.name}</Header>
              </Table.Cell>
              <Table.Cell>
                {community.attributes.hasPoliceStation ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell>
                {community.attributes.hasClinic ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell>
                {community.attributes.hasSchool ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell>
                {community.attributes.hasChurch ? "Yes" : "No"}
              </Table.Cell>
              <Table.Cell>
                {community.attributes.hasGroceryStore ? "Yes" : "No"}
              </Table.Cell>

              <Table.Cell>
                <Label as="a" onClick={() => onDelete(community.id)}>
                  Delete
                  <Icon name="trash" color="red" />
                </Label>
                <Label as="a" onClick={() => navigate("edit/" + community.id)}>
                  Edit
                  <Icon name="edit" />
                </Label>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
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
                  disabled={startFrom + perPage > itemsAmount}
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

export default ShowCommunity;
