interface TaskListProps {
  tasks: any[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ul>
      {tasks.map(task => <li>{task.taskName.plain_text}</li>)}
    </ul>
  )
}