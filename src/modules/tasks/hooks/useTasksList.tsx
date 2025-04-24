import { GridColDef } from "@mui/x-data-grid";
import { getTasks } from "helpers/tasks";
import { ITask } from "interfaces/tasks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { setLoading } from "store/loadingSlice";
import { getStatusName } from "utils/tasks";

export const useTasksList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  const dispatch = useAppDispatch()

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));
    getTasks({ page: pagination.page, limit: pagination.limit })
      .then(({ data, pagination: { total } }) => {
        setTasks(data);
        setPagination((prev) => ({ ...prev, total }));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [pagination.page, pagination.limit]);

  const onPaginationChange = (page: number, limit: number = pagination.limit) => {
    setPagination({ page, limit, total: pagination.total });
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 1
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (status) => getStatusName(status)
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <span
          style={{ color: "#1976d2", cursor: "pointer" }}
          onClick={() => navigate(`/tasks/${params.row._id}`)}
        >
          Details
        </span>
      )
    }
  ];

  return {
    tasks,
    columns,
    pagination,
    onPaginationChange
  };
};
