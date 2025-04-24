import { TableProps } from "antd";
import { LoadingContext } from "context/loading";
import { getTasks } from "helpers/tasks";
import { ITask } from "interfaces/tasks";
import { useContext, useEffect, useState } from "react";
import { getStatusName } from "utils/tasks";

export const useTasksList = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [pagination, setPagination] = useState<{ total: number }>({ total: 0 })
  const [filters, setFilters] = useState({ page: 1, limit: 10, })
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)
    getTasks(filters)
      .then(({ data, pagination: {total} }) => {
        setTasks(data)
        setPagination((prev) => ({ ...prev, total }))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [filters])
  const onPaginationChange = (page: number, limit: number) => {
    setFilters((prev) => ({ ...prev, page, limit }))
    setPagination((prev) => ({ ...prev, current: page }))

  }

  const columnsMd: TableProps<ITask>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status, ) => (<>
      {getStatusName(status)}
      </>),
    },
    {
      key: 'action',
      render: (_, record) => (
        <a href={`tasks/${record._id}`}>Details</a>
      ),
    },
  ];

  return { tasks, columns: columnsMd.map((column, idx) => ({ ...column, key: idx })), pagination, onPaginationChange, }
}
