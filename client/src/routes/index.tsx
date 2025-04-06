import { TaskForm } from "@/components/TaskForm/TaskForm.tsx";
import { TaskList } from "@/components/TaskList/TaskList.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
}
