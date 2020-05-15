import React from "react";
import { Formik, Form } from "formik";
import { Header, Button } from "semantic-ui-react";
import {
  TextField,
  ErrorMessage,
  CheckBox,
} from "../../../components/formikFields";
import * as Yup from "yup";
import { saveCommunity } from "../../../data/community";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const AddCommunityForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          hasPoliceStation: false,
          hasClinic: false,
          hasSchool: false,
          hasChurch: false,
          hasGroceryStore: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(2).max(100).required(),
        })}
        onSubmit={async (values) => {
          await saveCommunity(values);

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
    </div>
  );
};

export default AddCommunityForm;
