import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask, getTask, updateTask } from "helpers/tasks";
import { ITask } from "interfaces/tasks";
import { LoadingContext } from "context/loading";
import { showModal } from "utils/modal";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { requiredMsg } from "utils/form";

export const useTaskDetails = (id: string) => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo"
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTask(id)
      .then((result:any) => {
        setTask(result);
      })
      .catch(() => {
        navigate("/tasks");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const onCancelEdit = () => {
    setIsEdit(false);
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await updateTask(id, values);
      showModal({ title: "Task edited", text: "Task edited successfully", type: "success" });
      setTask(values);
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
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
    setLoading(true);
    deleteTask(id)
      .then(() => {
        showModal({ title: "Task deleted", text: "Task deleted successfully", type: "success" });
        navigate("/tasks");
      })
      .finally(() => {
        setLoading(false);
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
