import { deleteTask, getTask, updateTask } from "helpers/tasks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store";
import { setLoading } from "store/loadingSlice";
import Swal from "sweetalert2";
import { requiredMsg } from "utils/form";
import { showModal } from "utils/modal";
import * as Yup from "yup";

export const useTaskDetails = (id: string) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo"
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    getTask(id)
      .then((result:any) => {
        setTask(result);
      })
      .catch(() => {
        navigate("/tasks");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [id]);

  const onCancelEdit = () => {
    setIsEdit(false);
  };

  const onSubmit = async (values: any) => {
    dispatch(setLoading(true));
    try {
      await updateTask(id, values);
      showModal({ title: "Task edited", text: "Task edited successfully", type: "success" });
      setTask(values);
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onDeleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        onDeleteTask();
      }
    });
  };

  const onDeleteTask = () => {
    dispatch(setLoading(true));
    deleteTask(id)
      .then(() => {
        showModal({ title: "Task deleted", text: "Task deleted successfully", type: "success" });
        navigate("/tasks");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(requiredMsg),
    description: Yup.string().required(requiredMsg),
    status: Yup.string().required(requiredMsg)
  });

  return {
    task,
    isEdit,
    setIsEdit,
    onCancelEdit,
    onSubmit,
    onDeleteClick,
    validationSchema
  };
};
