import React, { useState, useEffect } from "react";
import { SelectField } from "../../formikFields";
import Parse from "parse";

function SelectCommunities(props) {
  const [communities, setCommunities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getdata = async () => {
    setIsLoading(true);
    const list = [];
    const queryCommunities = new Parse.Query(Parse.Object.extend("Community"));
    const data = await queryCommunities.find();
    await data.forEach((community) => {
      list.push({
        name: community.attributes.name,
        value: community.id,
      });
    });
    return list;
  };

  useEffect(() => {
    getdata()
      .then((data) => {
        setCommunities(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SelectField
        placeholder="Select Community"
        options={communities}
        {...props}
        isLoading={isLoading}
      ></SelectField>
    </>
  );
}

export default SelectCommunities;
