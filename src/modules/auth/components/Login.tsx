import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link as MuiLink
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface LoginProps {
  onChangeLogin: Dispatch<SetStateAction<boolean>>;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required")
});

export const Login = ({ onChangeLogin }: LoginProps) => {
  const { startLogin } = useAuth();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    remember: true
  };

  const handleSubmit = (values: LoginFormValues) => {
    startLogin(values);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form noValidate>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                />
              }
              label="Remember me"
            />

            <Grid container justifyContent="flex-end" sx={{ mt: 1, mb: 2 }}>
              <Typography variant="body2">
                Don’t have an account?{" "}
                <MuiLink component="button" onClick={() => onChangeLogin(false)}>
                  Click here
                </MuiLink>
              </Typography>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Button variant="contained" size="large" type="submit">
                Login
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
