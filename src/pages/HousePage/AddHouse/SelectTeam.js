import React, { useState, useEffect } from "react";
import { SelectField } from "../../../components/formikFields";
import Parse from "parse";

function SelectTeams(props) {
  const [teams, setTeams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getdata = async () => {
    setIsLoading(true);
    const list = [];
    const queryTeams = new Parse.Query(Parse.Object.extend("Team"));
    const data = await queryTeams.find();
    await data.forEach((team) => {
      list.push({
        name: team.attributes.name,
        value: team.id,
      });
    });
    return list;
  };

  useEffect(() => {
    getdata()
      .then((data) => {
        setTeams(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <SelectField
        options={teams}
        {...props}
        placeholder="Select Team"
        isLoading={isLoading}
      ></SelectField>
    </>
  );
}

export default SelectTeams;
