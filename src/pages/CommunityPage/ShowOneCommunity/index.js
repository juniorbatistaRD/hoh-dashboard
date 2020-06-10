import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import communityQuery from "../../../data/community";
import { Header, Label, Image } from "semantic-ui-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ShowOneCommunity = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHouse = async (id) => {
      const result = await communityQuery.get(id);

      setCommunity(result);

      setIsLoading(false);
    };
    getHouse(id);
  }, [id]);

  console.log({
    lat: parseFloat(community?.attributes.lat),
    lng: parseFloat(community?.attributes.lng),
  });
  return (
    <div>
      {!isLoading && (
        <div>
          <Header>Name</Header>
          <Label size="huge">{community.attributes.name}</Label>
          <Header>About the Community</Header>
          <Label size="huge">{community.attributes.about}</Label>
          <Header>Police Station</Header>
          <Label size="huge">
            {community.attributes.hasPoliceStation ? "Yes" : "No"}
          </Label>
          <Header>Clinic</Header>
          <Label size="huge">
            {community.attributes.hasClinic ? "Yes" : "No"}
          </Label>
          <Header>School</Header>
          <Label size="huge">
            {community.attributes.hasSchool ? "Yes" : "No"}
          </Label>
          <Header>Church</Header>
          <Label size="huge">
            {community.attributes.hasChurch ? "Yes" : "No"}
          </Label>
          <Header>Grocery Store</Header>
          <Label size="huge">
            {community.attributes.hasGroceryStore ? "Yes" : "No"}
          </Label>
          <Header> Pictures</Header>

          {community.attributes.pictures?.map((picture, index) => (
            <Image src={picture?.url()} key={index} size="medium" />
          ))}

          <LoadScript googleMapsApiKey="AIzaSyAOk10XvHlLabDUD54mU4fzIkVsBVjl420">
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={{
                lat: parseFloat(community.attributes.lat),
                lng: parseFloat(community.attributes.lng),
              }}
              zoom={14}
            >
              <Marker
                position={{
                  lat: parseFloat(community.attributes.lat),
                  lng: parseFloat(community.attributes.lng),
                }}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default ShowOneCommunity;
