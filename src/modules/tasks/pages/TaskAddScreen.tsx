import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useTaskAdd } from "../hooks/useTaskAdd";
import { TaskValuesForm } from "../components/TaskValuesForm";

export const TaskAddScreen = () => {
  const navigate = useNavigate();
  const { initialValues, onSubmit, validationSchema } = useTaskAdd();

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Task
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form noValidate>
            <TaskValuesForm />

            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              <Grid >
                <Button size="large" onClick={() => navigate("/tasks")}>
                  Cancel
                </Button>
              </Grid>
              <Grid >
                <Button type="submit" variant="contained" size="large">
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
