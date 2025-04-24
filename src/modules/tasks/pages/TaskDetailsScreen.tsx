import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { TaskValuesForm } from "../components/TaskValuesForm";
import { useTaskDetails } from "../hooks/useTaskDetails";

export const TaskDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/tasks");
  }

  const {
    task,
    isEdit,
    setIsEdit,
    onSubmit,
    onCancelEdit,
    onDeleteClick,
    validationSchema
  } = useTaskDetails(id || "0");

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Details
      </Typography>

      <Formik
        enableReinitialize
        initialValues={task}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form noValidate>
            <TaskValuesForm isView={!isEdit} />

            <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
              {!isEdit ? (
                <>
                  <Grid >
                    <Button size="large" color="error" onClick={onDeleteClick}>
                      Delete
                    </Button>
                  </Grid>
                  <Grid >
                    <Button size="large" onClick={() => navigate("/tasks")}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid >
                    <Button size="large" variant="contained" onClick={() => setIsEdit(true)}>
                      Edit
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid >
                    <Button size="large" onClick={onCancelEdit}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid >
                    <Button size="large" variant="contained" type="submit">
                      Save
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
