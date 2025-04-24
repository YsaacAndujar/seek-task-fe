import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { getTaskStats } from "helpers/tasks"
import { getStatusName } from "utils/tasks"
ChartJS.register(ArcElement, Tooltip, Legend)

type TaskStat = {
  status: "todo" | "in_progress" | "done"
  count: number
}

const COLORS = {
  todo: "#FFBB28",         
  in_progress: "#00C49F",  
  done: "#00C853"          
}

export const TaskPieChart = () => {
  const [data, setData] = useState<TaskStat[]>([])

  useEffect(() => {
    getTaskStats().then((_data:any) => setData(_data)).catch(console.error)
  }, [])

  const chartData = {
    labels: data.map((item) => getStatusName(item.status)),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: data.map((item) => COLORS[item.status]),
        borderWidth: 1
      }
    ]
  }

  return (
    <div style={{width: 300,}}>
    <Pie data={chartData} />
  </div>
  )
}
