import { Form } from "antd";
import { LoadingContext } from "context/loading";
import { deleteTask, getTask, updateTask } from "helpers/tasks";
import { ITask } from "interfaces/tasks";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showModal } from "utils/modal";
import Swal from 'sweetalert2'

export const useTaskDetails = (id: string) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [task, setTask] = useState<ITask>()
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        form.resetFields()
    }, [task])
    const [isEdit, setIsEdit] = useState(false)
    useEffect(() => {
        setLoading(true)
        getTask(id)
            .then((result) => {
                setTask(result)
            })
            .catch(() => {
                navigate('/tasks')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    const onCancelEdit = () => {
        setIsEdit(false)
        form.resetFields()
    }

    const onSubmit = (values: ITask) => {
        setLoading(true)
        updateTask(id, values)
            .then(() => {
                showModal({ title: 'Task edited', text: 'Task edited successfully', type: 'success' })
                setTask((prev) => ({ ...prev, ...values }))
            })
            .finally(() => {
                setLoading(false)
            })
    }

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
                onDeleteTask()
            }
        });
    }

    const onDeleteTask = () => {
        setLoading(true)
        deleteTask(id)
            .then(() => {
                showModal({ title: 'Task deleted', text: 'Task deleted successfully', type: 'success' })
                navigate('/tasks')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return { task, isEdit, form, setIsEdit, onCancelEdit, onSubmit, onDeleteClick }
}
