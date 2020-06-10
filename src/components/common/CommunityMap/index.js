import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { getAllCommunities } from "../../../data/community";
import { useNavigate } from "react-router-dom";

const CommunityMap = () => {
  const [communities, setCommunities] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const results = await getAllCommunities();
      console.log(results);
      setCommunities(results);
      setIsLoading(false);
    };

    getData();
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAOk10XvHlLabDUD54mU4fzIkVsBVjl420">
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={{
            lat: 18.47129,
            lng: -69.300306,
          }}
          zoom={11}
        >
          {!isLoading &&
            communities.map((community) => (
              <Marker
                onClick={() =>
                  navigate("/app/communities/show/" + community.id)
                }
                label={community.attributes.name}
                position={{
                  lat: parseFloat(community.attributes.lat),
                  lng: parseFloat(community.attributes.lng),
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CommunityMap;
