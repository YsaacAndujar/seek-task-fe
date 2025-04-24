import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface TaskValuesFormProps {
  isView?: boolean;
}

export const TaskValuesForm = ({ isView }: TaskValuesFormProps) => {
  const {
    values,
    handleChange,
    setFieldValue,
    errors,
    touched
  } = useFormikContext<any>();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* Title */}
      <TextField
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        disabled={isView}
        error={touched.title && Boolean(errors.title)}
        helperText={<>
        {touched.title && typeof errors.title === "string" && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.title}
          </Typography>
        )}
        </>}
        fullWidth
      />

      {/* Description */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>Description</Typography>
        <ReactQuill
          value={values.description}
          onChange={(val) => setFieldValue("description", val)}
          readOnly={isView}
          theme="snow"
        />
        {touched.description && typeof errors.description === "string" && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.description}
          </Typography>
        )}
      </Box>

      {/* Status */}
      <FormControl fullWidth error={touched.status && Boolean(errors.status)}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange}
          disabled={isView}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
        {touched.status && typeof errors.status === "string" && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.status}
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};
