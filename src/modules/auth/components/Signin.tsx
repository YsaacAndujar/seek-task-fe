import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link as MuiLink
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { requiredMsg, passwordMatchMsg } from "utils/form";

interface SigninProps {
  onChangeLogin: Dispatch<SetStateAction<boolean>>;
}

interface SigninForm {
  email: string;
  password: string;
  confirm: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Please enter a valid email address").required(requiredMsg),
  password: Yup.string().min(6, "Password must be at least 6 characters").required(requiredMsg),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), ""], passwordMatchMsg)
    .required(requiredMsg)
});

export const Signin = ({ onChangeLogin }: SigninProps) => {
  const { startSignin } = useAuth();

  const initialValues: SigninForm = {
    email: "",
    password: "",
    confirm: ""
  };

  const handleSubmit = (values: SigninForm) => {
    const { email, password } = values;
    startSignin({ email, password });
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Signin
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

            <TextField
              label="Confirm Password"
              name="confirm"
              type="password"
              fullWidth
              margin="normal"
              value={values.confirm}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirm && Boolean(errors.confirm)}
              helperText={touched.confirm && errors.confirm}
            />

            <Grid container justifyContent="flex-end" sx={{ mt: 1, mb: 2 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <MuiLink component="button" onClick={() => onChangeLogin(true)}>
                  Click here
                </MuiLink>
              </Typography>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Button type="submit" variant="contained" size="large">
                Signin
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
