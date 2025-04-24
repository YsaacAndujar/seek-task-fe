import { Form, Input, Select } from "antd";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { requiredMsg } from "utils/form";

interface TaskValuesFormProps {
    isView?: boolean
}

export const TaskValuesForm = ({ isView }: TaskValuesFormProps) => {
    return (
        <>
            <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: requiredMsg }]}
            >
                <Input disabled={isView} />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: requiredMsg }]}
            >
                <ReactQuill theme="snow" readOnly={isView} />
            </Form.Item>
            <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: requiredMsg }]}
            >
                <Select disabled={isView} placeholder="Select status">
                    <Select.Option value="todo">To Do</Select.Option>
                    <Select.Option value="in_progress">In Progress</Select.Option>
                    <Select.Option value="done">Done</Select.Option>
                </Select>
            </Form.Item>
        </>
    )
}
