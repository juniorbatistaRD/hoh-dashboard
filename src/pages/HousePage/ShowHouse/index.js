import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header, Label, Image, Divider, Icon } from "semantic-ui-react";
import Parse from "parse";
import moment from "moment";

const ShowHouse = () => {
  const { id } = useParams();
  const [house, setHouse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getHouse = async (id) => {
      const query = new Parse.Query("House");

      const result = await query.get(id);

      setHouse(result);

      setIsLoading(false);
    };
    getHouse(id);
  }, [id]);

  return (
    <div>
      {!isLoading && (
        <>
          <Header>Applicant's Name</Header>
          <Label size="huge">{house.attributes.applicantName}</Label>
          <Header>Spouse's Name</Header>
          <Label size="huge">{house.attributes.spouseName}</Label>
          <Header>Childrens Name and Ages</Header>
          <Label size="huge">{house.attributes.childrenNameAndAge}</Label>
          <Header>Applicant's Job</Header>
          <Label size="huge">{house.attributes.applicantJob}</Label>
          <Header>Spouse's Job</Header>
          <Label size="huge">{house.attributes.spouseJob}</Label>
          <Header>Total Income</Header>
          <Label size="huge">{house.attributes.totalIncome}</Label>
          <Header>Current Situation</Header>
          <Label size="huge">{house.attributes.currentSituation}</Label>
          <Header>Years Living in the Community</Header>
          <Label size="huge">
            {house.attributes.yearsLivingInTheCommunity}
          </Label>
          <Header>Contact Information</Header>
          <Label size="huge">{house.attributes.contactInformation}</Label>
          <Header>Community</Header>
          <Label size="huge">
            <Link
              to={"/app/communities/show/" + house.attributes.community?.id}
            >
              {house.attributes.community?.attributes.name}
            </Link>
          </Label>
          <Header>Property Information</Header>
          <Label size="huge">{house.attributes.propertyInformation}</Label>
          <Header>References</Header>
          <Label size="huge">{house.attributes.references}</Label>

          <Header>Pictures Of Property</Header>
          {house.attributes.picturesOfProperty?.map((picture, index) => (
            <Image src={picture?.url()} key={index} size="medium" />
          ))}
          <Header> Pictures of Family</Header>
          {house.attributes.picturesOfFamily?.map((picture, index) => (
            <Image src={picture?.url()} key={index} size="medium" />
          ))}
          <Header>More Info</Header>
          <Label size="huge">{house.attributes.moreInfo}</Label>
          <Header>Team</Header>
          <Label size="huge">{house.attributes.team?.attributes.name}</Label>
          <Header>Team Leader</Header>
          <Label size="huge">{house.attributes.teamLeader}</Label>
          <Header>Team Size</Header>
          <Label size="huge">{house.attributes.teamSize}</Label>

          <Header>Ownership Proof Pictures</Header>
          {house.attributes.ownershipProof?.map((picture, index) => (
            <Image src={picture?.url()} key={index} size="medium" />
          ))}
          <Divider horizontal>
            <Header as="h4">
              <Icon name="forward" />
              Post Build Information
            </Header>
          </Divider>
          <Header>Date it was built</Header>
          <Label size="huge">
            {moment(house.attributes.builtAt).format("YYYY-MM-DD")}
          </Label>
          <Header>New House Pictures</Header>
          {house.attributes.newHousePictures?.map((picture, index) => (
            <Image src={picture?.url()} key={index} size="medium" />
          ))}
          <Header>Build Team</Header>
          <Label size="huge">{house.attributes.buildTeam}</Label>
          <Header>HighLights</Header>
          <Label size="huge">{house.attributes.highlights}</Label>
          <Header>Extra Info</Header>
          <Label size="huge">{house.attributes.extraInfo}</Label>
        </>
      )}
    </div>
  );
};

export default ShowHouse;
