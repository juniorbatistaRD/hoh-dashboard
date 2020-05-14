import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Header, Button } from "semantic-ui-react";
import { TextField, ErrorMessage } from "../../../components/formikFields";
import * as Yup from "yup";
import { updateTeamById, getTeamById } from "../../../data/teams";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";

const EditTeamForm = ({ team }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    const getdata = async () => {
      const data = await getTeamById(team);
      setInitialData(data);
      setIsLoading(false);
    };

    getdata();
  }, [team]);

  console.log(initialData);
  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <Formik
          initialValues={{
            name: initialData.attributes.name,
            leader: initialData.attributes.teamLeader,
            teamMembers: initialData.attributes.teamMembers,
            place: initialData.attributes.placeIsFrom,
          }}
          validationSchema={Yup.object({
            name: Yup.string().min(2).max(100).required(),
            leader: Yup.string().min(2).max(100).required(),
            teamMembers: Yup.number().min(1).max(100).required(),
            place: Yup.string().min(2).max(100).required(),
          })}
          onSubmit={async (values) => {
            console.log(values);
            await updateTeamById({ id: team, ...values });

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
                Team's Leader
              </Header>
              <TextField name="leader" placeholder="Team's Leader" />
              <ErrorMessage name="leader" />
              <Header sub textAlign="left">
                Team's Members
              </Header>
              <TextField name="teamMembers" placeholder="Teams Number" />
              <ErrorMessage name="teamMembers" />
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
      )}
    </div>
  );
};

export default EditTeamForm;
