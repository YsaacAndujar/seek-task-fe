import {
  Box,
  Button,
  Grid,
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ITask } from "interfaces/tasks";
import { useNavigate } from "react-router-dom";
import { TaskPieChart } from "../components/TaskPieChart";
import { useTasksList } from "../hooks/useTasksList";
export const TasksListScreen = () => {
  const { tasks, pagination, onPaginationChange, columns } = useTasksList();
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>

      <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
  <TaskPieChart />
</Box>

      <Grid container justifyContent="flex-end" sx={{ mb: 3 }}>
        <Button variant="contained" size="large" onClick={() => navigate("add")}>
          Add
        </Button>
      </Grid>

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          getRowId={(row: ITask) => row._id}
          rowCount={pagination.total}
          pagination
          paginationMode="server"
          paginationModel={{
            page: pagination.page - 1,
            pageSize: pagination.limit
          }}
          onPaginationModelChange={({ page, pageSize }) => {
            onPaginationChange(page + 1, pageSize);
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Box>
    </Box>
  );
};
