import React from "react";
import { Formik, Form } from "formik";
import { Header, Button, Divider, Icon } from "semantic-ui-react";
import {
  TextField,
  ErrorMessage,
  TextArea,
} from "../../../components/formikFields";
import * as Yup from "yup";
import { saveHouse } from "../../../data/house";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";
import SelectTeams from "./SelectTeam";
import SelectCommunities from "./SelectCommunity";
import { getTeamById } from "../../../data/teams";
import { getCommunityById } from "../../../data/community";
import MultiFilesField from "../../../components/formikFields/MultiFilesField";

const AddHouseForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Formik
        initialValues={{
          applicantName: "",
          applicantAge: 0,
          spouseName: "",
          spouseAge: 0,
          childrenNameAndAge: "",
          applicantJob: "",
          spouseJob: "",
          totalIncome: 0,
          currentSituation: "",
          yearsLivingInTheCommunity: 0,
          contactInformation: "",
          propertyInformation: "",
          references: "",
          extraInfo: "",
          buildTeam: "",
          // builtAt: moment().format("YYYY-MM-DD"),
          builtAt: undefined,
          highlights: "",
          team: "",
          teamLeader: "",
          teamSize: 0,
          community: "",
          ownershipProof: [],
          picturesOfFamily: [],
          picturesOfProperty: [],
          newHousePictures: [],
        }}
        validationSchema={Yup.object({
          applicantName: Yup.string().min(2).max(100).required(),
          spouseName: Yup.string().min(2).max(100).required(),
        })}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const builtAt = values.builtAt ? new Date(values.builtAt) : null;
            const team = values.team ? await getTeamById(values.team) : null;
            const community = values.community
              ? await getCommunityById(values.community)
              : null;
            await saveHouse({ ...values, builtAt, community, team });
          } catch (err) {
            console.log(err);
          }

          swal({ icon: "success", text: "Item saved" }).then(() =>
            navigate("/app/houses")
          );
        }}
      >
        {(props) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <Header sub textAlign="left">
              Applicant's Name
            </Header>
            <TextField name="applicantName" placeholder="Applicant's Name" />
            <ErrorMessage name="applicantName" />
            <Header sub textAlign="left">
              Applicant's Age
            </Header>
            <TextField
              name="applicantAge"
              placeholder="Applicant's Age"
              type="number"
            />
            <ErrorMessage name="applicantAge" />
            <Header sub textAlign="left">
              Spouse's Name
            </Header>
            <TextField name="spouseName" placeholder="Spouse's Name" />
            <ErrorMessage name="spouseName" />
            <Header sub textAlign="left">
              Spouse's Age
            </Header>
            <TextField
              name="spouseAge"
              placeholder="Spouse's Age"
              type="number"
            />
            <ErrorMessage name="spouseAge" />
            <Header sub textAlign="left">
              Children's Names and Ages
            </Header>
            <TextArea
              name="childrenNameAndAge"
              placeholder="children's Name and Ages"
            />
            <ErrorMessage name="childrenNameAndAge" />
            <Header sub textAlign="left">
              Applicant's Job
            </Header>
            <TextField name="applicantJob" placeholder=" Applicant's Job" />
            <ErrorMessage name="applicantJob" />
            <Header sub textAlign="left">
              Spouse's Job
            </Header>
            <TextField name="spouseJob" placeholder=" Spouse's Job" />
            <ErrorMessage name="spouseJob" />
            <Header sub textAlign="left">
              Total Monthly Income (USD)
            </Header>
            <TextField
              type="number"
              name="totalIncome"
              placeholder="Total Income"
            />
            <ErrorMessage name="totalIncome" />
            <Header sub textAlign="left">
              Current Situation
            </Header>
            <TextField
              name="currentSituation"
              placeholder="Current Situation"
            />
            <ErrorMessage name="currentSituation" />
            <Header sub textAlign="left">
              Years Living in The Community
            </Header>
            <TextField
              type="number"
              name="yearsLivingInTheCommunity"
              placeholder="Years Living in The Community"
            />
            <ErrorMessage name="yearsLivingInTheCommunity" />
            <Header sub textAlign="left">
              Community
            </Header>
            <SelectCommunities name="community" />
            <ErrorMessage name="community" />
            <Header sub textAlign="left">
              Contact Information
            </Header>
            <TextArea
              name="contactInformation"
              placeholder="Contact Information"
            />
            <ErrorMessage name="contactInformation" />
            <Header sub textAlign="left">
              Property Information
            </Header>
            <TextArea
              name="propertyInformation"
              placeholder="Property Information"
            />
            <ErrorMessage name="propertyInformation" />
            <Header sub textAlign="left">
              References
            </Header>
            <TextArea name="references" placeholder="References" />
            <ErrorMessage name="references" />
            <Header sub textAlign="left">
              Extra Info
            </Header>
            <TextArea
              name="extraInfo"
              placeholder="During the family meeting info"
            />
            <ErrorMessage name="extraInfo" />

            <Header sub textAlign="left">
              Pictures Of Family
            </Header>
            <MultiFilesField
              name="picturesOfFamily"
              multiple
              accept="image/*"
              setFieldValue={props.setFieldValue}
            />
            <Header sub textAlign="left">
              Pictures Of Ownership Proof
            </Header>
            <MultiFilesField
              name="ownershipProof"
              multiple
              accept="image/*"
              setFieldValue={props.setFieldValue}
            />
            <Header sub textAlign="left">
              Pictures Of Property
            </Header>
            <MultiFilesField
              name="picturesOfProperty"
              multiple
              accept="image/*"
              setFieldValue={props.setFieldValue}
            />

            <Divider horizontal>
              <Header as="h4">
                <Icon name="forward" />
                Post Build Information
              </Header>
            </Divider>
            <Header sub textAlign="left">
              Build Team
            </Header>
            <TextArea name="buildTeam" placeholder="Build Team" />
            <Header sub textAlign="left">
              Team Leader
            </Header>
            <TextField name="teamLeader" placeholder="Team Leader" />
            <ErrorMessage name="teamLeader" />
            <Header sub textAlign="left">
              Team Size
            </Header>
            <TextField name="teamSize" placeholder="Team Size" type="number" />
            <ErrorMessage name="teamSize" />
            <Header sub textAlign="left">
              Date it was Built
            </Header>
            <TextField
              type="date"
              name="builtAt"
              placeholder="Date it was Built"
            />
            <ErrorMessage name="builtAt" />
            <Header sub textAlign="left">
              New House Picture
            </Header>
            <MultiFilesField
              name="newHousePictures"
              multiple
              accept="image/*"
              setFieldValue={props.setFieldValue}
            />
            <Header sub textAlign="left">
              Highlights
            </Header>
            <TextArea
              name="highlights"
              placeholder="House highlights (good or bad)"
            />

            <Header sub textAlign="left">
              Team
            </Header>
            <SelectTeams name="team" />
            <ErrorMessage name="team" />
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

export default AddHouseForm;
