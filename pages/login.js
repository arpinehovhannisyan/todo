import React from "react";
import { QueryClient, QueryClientProvider, useMutation, useQueries } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { postRequest } from "@/api";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
}

const useLoginMutation = () => {
  return useMutation({
    mutationFn: (formPayload) => {
      return postRequest({ url: "/user/sign-in", body: formPayload })
    },
    onSuccess: ({ data }) => {
      setCookie("token", data.jwt)
      setCookie("refreshToken", data.refreshToken)

    }

  });
};

const validationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const LoginForm = () => {

  const router = useRouter();

  const { mutate } = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          router.push("/home")
        },

        onError: (error) => {
          alert("Login failed. Please check your email and password.");
          console.log(error);
        },

      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          name="email"
          label="Email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          name="password"
          type="text"
          label="Password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" className=" bg-green-800 hover:bg-green-700 text-white">
          Login
        </Button>
      </form>
    </div>
  );
};
