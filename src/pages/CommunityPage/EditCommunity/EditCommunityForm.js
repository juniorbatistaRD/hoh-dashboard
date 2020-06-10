import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Header, Button } from "semantic-ui-react";
import {
  TextField,
  ErrorMessage,
  CheckBox,
  TextArea,
} from "../../../components/formikFields";
import * as Yup from "yup";
import { getCommunityById, updateCommunityById } from "../../../data/community";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";
import MultiFilesField from "../../../components/formikFields/MultiFilesField";

const EditTeamForm = ({ community }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    const getdata = async () => {
      const data = await getCommunityById(community);
      setInitialData(data);
      setIsLoading(false);
    };

    getdata();
  }, [community]);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <Formik
          initialValues={{
            name: initialData.attributes.name,
            hasPoliceStation: initialData.attributes.hasPoliceStation,
            hasClinic: initialData.attributes.hasClinic,
            hasSchool: initialData.attributes.hasSchool,
            hasChurch: initialData.attributes.hasChurch,
            hasGroceryStore: initialData.attributes.hasGroceryStore,
            about: initialData.attributes.about,
            pictures: [],
            lat: initialData.attributes.lat,
            lng: initialData.attributes.lng,
          }}
          validationSchema={Yup.object({
            name: Yup.string().min(2).max(100).required(),
          })}
          onSubmit={async (values) => {
            await updateCommunityById({ id: community, ...values });

            swal({ icon: "success", text: "Item saved" }).then(() =>
              navigate("/app/communities")
            );
          }}
        >
          {(props) => (
            <Form style={{ display: "flex", flexDirection: "column" }}>
              <Header sub textAlign="left">
                Community's name
              </Header>
              <TextField name="name" placeholder="Team's Name" />
              <ErrorMessage name="name" />
              <Header sub textAlign="left">
                <span>Has A Police Station?</span>
                <CheckBox name="hasPoliceStation" />
              </Header>
              <Header sub textAlign="left">
                <span>Has A Clinic?</span>
                <CheckBox name="hasClinic" />
              </Header>
              <Header sub textAlign="left">
                <span>Has A School?</span>
                <CheckBox name="hasSchool" />
              </Header>
              <Header sub textAlign="left">
                <span>Has A Church?</span>
                <CheckBox name="hasChurch" />
              </Header>
              <Header sub textAlign="left">
                <span>Has A Grocery Store?</span>
                <CheckBox name="hasGroceryStore" />
              </Header>
              <Header sub textAlign="left">
                <span>About the Communitty</span>
              </Header>
              <TextArea name="about" />
              <Header sub textAlign="left">
                <span>Latitude</span>
              </Header>
              <TextField name="lat" />
              <Header sub textAlign="left">
                <span>Longitud</span>
              </Header>
              <TextField name="lng" />

              <Header sub textAlign="left">
                Pictures (Updating the pictures will replace all the previus
                ones)
              </Header>
              <MultiFilesField
                name="pictures"
                multiple
                accept="image/*"
                setFieldValue={props.setFieldValue}
              />
              <span style={{ textAlign: "left" }}>
                {initialData.attributes.pictures &&
                  `There's ${initialData.attributes.pictures?.length} pictures already in the server`}
              </span>

              <Button
                primary
                style={{ marginTop: 10 }}
                loading={props.isSubmitting}
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditTeamForm;
