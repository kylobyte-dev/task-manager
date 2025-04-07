import { Task } from "@/api/tasks.ts";
import { Checkbox } from "../ui/checkbox.tsx";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config.ts";
import { useLogto } from "@logto/react";

export function TaskList() {
  const { getAccessToken } = useLogto();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const accessToken = await getAccessToken(
        "https://api.taskmanager.kylobyte.dev/"
      );
      const response = await fetch(config.beUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
