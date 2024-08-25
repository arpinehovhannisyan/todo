import React from "react";
import { QueryClient, QueryClientProvider, useMutation } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { postRequest } from "@/api";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SignupForm />
    </QueryClientProvider>
  );
}
const useSignupMutation = () => {
  return useMutation({
    mutationFn: (formPayload) => {
      return postRequest({ url: "/user", body: formPayload });

    },
    onSuccess: ({ data }) => {
      setCookie("userId",data._id)
    }
  });
};
const validationSchema = yup.object({
  name: yup.string("Enter your full name").required("Full Name is required"),
  surname: yup.string("Enter your surname").required("Surname is required"),
  password: yup.string("Enter your password").required("Password is required"),
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  confirmPassword: yup.string("Enter your password").required("Password is required"),
});
const formFields = [
  { name: "name", label: "Name", placeholder: "Name" },
  { name: "surname", label: "Surname", placeholder: "Surname" },
  { name: "email", label: "Email", placeholder: "Email" },
  { name: "password", label: "Password", placeholder: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", placeholder: "Confirm Password", type: "password" },
];
const SignupForm = () => {
  const { mutate } = useSignupMutation();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values, {

        onSuccess: () => {
          router.push("/login")
        },
        onError: (error) => {
          alert("An error occurred while submitting the form");
          console.log(error);
        }
      });
    }
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {formFields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type || "text"}
            value={formik.values[field.name]}
            onChange={formik.handleChange}
            error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
            helperText={formik.touched[field.name] && formik.errors[field.name]}
          />
        ))}
        <Button variant="outlined" fullWidth type="submit" className=" bg-green-800 hover:bg-green-700 text-white">
          Submit
        </Button>
      </form>
    </div>
  );
};
