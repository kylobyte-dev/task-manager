import { TaskForm } from "@/components/TaskForm/TaskForm.tsx";
import { TaskList } from "@/components/TaskList/TaskList.tsx";
import { authBeforeLoad } from "@/lib/routing.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: authBeforeLoad,
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
