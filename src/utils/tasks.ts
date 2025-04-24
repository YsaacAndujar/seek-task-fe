export const getStatusName = (status: string) =>{
    const names: Record<string, string> = {
      'todo':'To Do',
      'in_progress':'In Progress',
      'done':'Done',
    }
    return names[status] || 'N/A'
  }