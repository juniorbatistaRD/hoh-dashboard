import React, { useState, useEffect } from "react";
import { Table, Icon, Header, Label, Menu } from "semantic-ui-react";
import { searchHousesWithPagination, deleteHouse } from "../../data/house";
import { useNavigate } from "react-router-dom";
import swal from "@sweetalert/with-react";

const SearchResults = ({ searchParams }) => {
  const [items, setItems] = useState([]);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [startFrom, setStartFrom] = useState(0);
  const perPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    searchHousesWithPagination({ startFrom, perPage, searchParams }).then(
      (data) => {
        setItems(data.results);
        setItemsAmount(data.count);
      }
    );
  }, [perPage, searchParams, startFrom]);

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
        deleteHouse(id).then(() =>
          swal("The item has been deleted!" + willDelete, {
            icon: "success",
          })
        );
      }
    });
  };

  return (
    <div>
      <Header style={{ marginTop: 20 }}>{`${itemsAmount} items found`}</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Applicant Name</Table.HeaderCell>
            <Table.HeaderCell>Total Income</Table.HeaderCell>
            <Table.HeaderCell>Children Name and Age</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                <Header sub>{item.attributes.applicantName}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header sub>{item.attributes.totalIncome}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header sub>{item.attributes.childrenNameAndAge}</Header>
              </Table.Cell>

              <Table.Cell>
                <Label
                  as="a"
                  onClick={() => navigate("/app/houses/show/" + item.id)}
                >
                  See All Information
                  <Icon name="eye" />
                </Label>
                <Label as="a" onClick={() => onDelete(item.id)}>
                  Delete
                  <Icon name="trash" color="red" />
                </Label>
                <Label
                  as="a"
                  onClick={() => navigate("/app/houses/edit/" + item.id)}
                >
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
    </div>
  );
};

export default SearchResults;
