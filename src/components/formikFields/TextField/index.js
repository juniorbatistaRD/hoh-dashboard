import React from "react";
import { useField } from "formik";
import { Input } from "semantic-ui-react";

function TextField({ ...props }) {
  const [field] = useField(props);

  return <Input {...field} {...props} />;
}

export default TextField;
