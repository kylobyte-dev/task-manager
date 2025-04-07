import { Task } from "@/api/tasks.ts";
import { Checkbox } from "../ui/checkbox.tsx";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config.ts";

export function TaskList() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(config.beUrl);
      return await response.json();
    },
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.tasks.map((task: Task) => (
        <li key={task.taskId}>
          <Checkbox checked={task.checked.name === "Done"} /> {task.taskName}
        </li>
      ))}
    </ul>
  );
}
