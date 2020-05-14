import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Form, Formik } from "formik";
import Parse from "parse";
import * as Yup from "yup";
import { TextField, ErrorMessage } from "../../formikFields";
import { Button } from "semantic-ui-react";
import swal from "@sweetalert/with-react";
import styles from "./index.module.css";

const LoginForm = () => {
  const { setCurrentUser } = useContext(AuthContext);

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Correo invalido")
            .required("Correo requerido"),

          password: Yup.string()
            .min(6, "Codigo secreto muy corto")
            .required("Se te olvido tu codigo secreto"),
        })}
        onSubmit={async (values) => {
          try {
            await Parse.User.logIn(values.email, values.password);
            setCurrentUser(Parse.User.current());
          } catch (e) {
            console.log(e);
            swal({
              text: e.message,
              icon: "error",
            });
          }
        }}
      >
        {(props) => (
          <Form className={styles.form}>
            <TextField placeholder="Tu correo" name="email" type="email" />
            <ErrorMessage name="email" />
            <TextField
              placeholder="Tu codigo secreto"
              name="password"
              type="password"
            />
            <ErrorMessage name="password" />
            <div className={styles.btns_container}>
              <Button
                className={styles.submit_button}
                loading={props.isSubmitting}
                type="submit"
              >
                Iniciar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
