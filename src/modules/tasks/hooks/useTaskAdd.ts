import { useContext } from "react";
import { LoadingContext } from "context/loading";
import { postTask } from "helpers/tasks";
import { showModal } from "utils/modal";
import * as Yup from "yup";
import { requiredMsg } from "utils/form";

export const useTaskAdd = () => {
  const { setLoading } = useContext(LoadingContext);

  const initialValues = {
    title: "",
    description: "",
    status: "todo"
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(requiredMsg),
    description: Yup.string().required(requiredMsg),
    status: Yup.string().required(requiredMsg)
  });

  const onSubmit = async (values: any, { resetForm }: any) => {
    try {
      setLoading(true);
      await postTask(values);
      showModal({ title: "Task added", text: "Task added successfully", type: "success" });
      resetForm();
    } catch (error) {
      console.error("Failed to add task", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit
  };
};
