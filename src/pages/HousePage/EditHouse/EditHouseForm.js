import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Header, Divider, Icon, Button } from "semantic-ui-react";
import {
  TextField,
  ErrorMessage,
  TextArea,
} from "../../../components/formikFields";
import SelectCommunities from "../../../components/common/SelectCommunity";
import SelectTeams from "../../../components/common/SelectTeams";
import MultiFilesField from "../../../components/formikFields/MultiFilesField";
import * as Yup from "yup";
import { getTeamById } from "../../../data/teams";
import { getCommunityById } from "../../../data/community";
import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";
import { getHouseById, updateHouseById } from "../../../data/house";
import moment from "moment";

const EditHouseForm = ({ houseId }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState();

  useEffect(() => {
    const getdata = async () => {
      const data = await getHouseById(houseId);
      setInitialData(data);
      setIsLoading(false);
    };

    getdata();
  }, [houseId]);

  return (
    <div>
      {!isLoading && (
        <Formik
          initialValues={{
            applicantName: initialData.attributes.applicantName,
            spouseName: initialData.attributes.spouseName,
            childrenNameAndAge: initialData.attributes.childrenNameAndAge,
            applicantJob: initialData.attributes.applicantJob,
            spouseJob: initialData.attributes.spouseJob,
            totalIncome: initialData.attributes.totalIncome,
            currentSituation: initialData.attributes.currentSituation,
            yearsLivingInTheCommunity:
              initialData.attributes.yearsLivingInTheCommunity,
            contactInformation: initialData.attributes.contactInformation,
            propertyInformation: initialData.attributes.propertyInformation,
            references: initialData.attributes.references,
            extraInfo: initialData.extraInfo,
            buildTeam: initialData.attributes.buildTeam,
            builtAt: moment(initialData.attributes.buildAt).format(
              "YYYY-MM-DD"
            ),
            highlights: initialData.attributes.highlights,
            team: initialData.attributes.team?.id,
            teamLeader: initialData.attributes.teamLeader,
            teamSize: initialData.attributes.teamSize,
            community: initialData.attributes.community?.id,
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

              await updateHouseById({
                ...values,
                id: houseId,
                builtAt,
                community,
                team,
              });
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
                Spouse's Name
              </Header>
              <TextField name="spouseName" placeholder="Spouse's Name" />
              <ErrorMessage name="spouseName" />
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
                Total Income (USD)
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
                Pictures Of Family (Updating the pictures will replace all the
                previus ones)
              </Header>

              <MultiFilesField
                name="picturesOfFamily"
                multiple
                accept="image/*"
                setFieldValue={props.setFieldValue}
              />
              <Header sub textAlign="left">
                Pictures Of Ownership Proof (Updating the pictures will replace
                all the previus ones)
              </Header>
              <MultiFilesField
                name="ownershipProof"
                multiple
                accept="image/*"
                setFieldValue={props.setFieldValue}
              />
              <Header sub textAlign="left">
                Pictures Of Property (Updating the pictures will replace all the
                previus ones)
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
              <TextField
                name="teamSize"
                placeholder="Team Size"
                type="number"
              />
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
      )}
    </div>
  );
};

export default EditHouseForm;
