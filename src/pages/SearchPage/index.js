import React, { useState } from "react";
import { Header, Icon, Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import {
  TextField,
  ErrorMessage,
  SelectField,
} from "../../components/formikFields";
import SearchResults from "./SearchResults";
import SelectTeams from "../../components/common/SelectTeams";
import SelectCommunities from "../../components/common/SelectCommunity";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useState({});

  return (
    <div>
      <Header as="h2" style={{ margin: 10 }}>
        <Icon name="search" />
        <Header.Content>Search</Header.Content>
      </Header>

      <Formik
        initialValues={{
          applicantName: "",
          team: "",
          community: "",
          year: "",
        }}
        onSubmit={(values) => setSearchParams(values)}
      >
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "70%",
            margin: "auto",
          }}
        >
          <Header sub textAlign="left">
            Applicant Name
          </Header>
          <TextField name="applicantName" placeholder="Applicant Name" />
          <ErrorMessage name="applicantName" />
          <Header sub textAlign="left">
            Year
          </Header>
          <SelectField
            name="year"
            placeholder="Year"
            options={[
              { name: 2010, value: 2010 },
              { name: 2011, value: 2011 },
              { name: 2012, value: 2012 },
              { name: 2013, value: 2013 },
              { name: 2014, value: 2014 },
              { name: 2015, value: 2015 },
              { name: 2016, value: 2016 },
              { name: 2017, value: 2017 },
              { name: 2018, value: 2018 },
              { name: 2019, value: 2019 },
              { name: 2020, value: 2020 },
            ]}
          ></SelectField>
          <ErrorMessage name="applicantName" />
          <Header sub textAlign="left">
            Team
          </Header>
          <SelectTeams name="team" />
          <Header sub textAlign="left">
            Community
          </Header>
          <SelectCommunities name="community" />
          <Button type="submit" primary>
            Search
          </Button>
        </Form>
      </Formik>

      <SearchResults searchParams={searchParams} />
    </div>
  );
};

export default SearchPage;
