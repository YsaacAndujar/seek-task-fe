import { Form } from "antd";
import { LoadingContext } from "context/loading";
import { postTask } from "helpers/tasks";
import { ITask } from "interfaces/tasks";
import { useContext } from "react";
import { showModal } from "utils/modal";

export const useTaskAdd = () => {
    const [form] = Form.useForm();
    const { setLoading } = useContext(LoadingContext)

    const onSubmit = (values: ITask) => {
        setLoading(true)
        postTask(values)
            .then(() => {
                showModal({ title: 'Task added', text: 'Task added successfully', type: 'success' })
                form.resetFields()
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return { form, onSubmit }
}
