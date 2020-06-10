import React from "react";
import { Formik, Form } from "formik";
import { Header, Button } from "semantic-ui-react";
import { TextField, ErrorMessage } from "../../../components/formikFields";
import * as Yup from "yup";
import { saveTeam } from "../../../data/teams";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const AddTeamForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          place: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(2).max(100).required(),
          place: Yup.string().min(2).max(100).required(),
        })}
        onSubmit={async (values) => {
          console.log(values);
          await saveTeam(values);

          swal({ icon: "success", text: "Team saved" }).then(() =>
            navigate("/app/teams")
          );
        }}
      >
        {(props) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <Header sub textAlign="left">
              Team's name
            </Header>
            <TextField name="name" placeholder="Team's Name" />
            <ErrorMessage name="name" />

            <Header sub textAlign="left">
              Place
            </Header>
            <TextField name="place" placeholder="Where is the Team From?" />
            <ErrorMessage name="place" />
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

export default AddTeamForm;
