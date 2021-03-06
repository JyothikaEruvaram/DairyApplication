import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const formSchema = Yup.object().shape({
  name:Yup.string()
        .min(2,'Too short')
        .max(50,'Too Long!').required("Required"),
  age:Yup.number().required("Should be an integer"),
  mobile:Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Signup = () => {
  const navigate=useNavigate();
  const handleOnSubmit = (values, actions) => {
    axios({
      method: "POST",
      url: "/users/signup",
      data: values,
    })
      .then((response) => {
        console.log(response.data);
        actions.setSubmitting(true);
        actions.resetForm();
        navigate("/");
      })
      .catch((error) => {
        actions.setSubmitting(false);
      });
  };
  return (
    <div>
      <h1>SignUp</h1>
      <Formik
        initialValues={{ name:"",age:"",mobile:"",email: "", password: "" }}
        onSubmit={handleOnSubmit}
        validationSchema={formSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field id="name" type="text" name="name" />
            <ErrorMessage name="name"/><br/>
            <label htmlFor="age">Age:</label>
            <Field id="age" name="age" type="text"/>
            <ErrorMessage name="age"/><br/>
            <label htmlFor="mobile">Mobile No:</label>
            <Field id="mobile" name="mobile" type="text"/>
            <ErrorMessage name="mobile"/><br/>
            <label htmlFor="email">Email:</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email"/><br/>
            <label htmlFor="password">Password:</label>
            <Field id="password" name="password" type="password"/>
            <ErrorMessage name="password"/><br/>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;