import { z } from "zod";
import { makeEndpoint } from "@zodios/core";

export const Task = z.object({
  taskId: z.string(),
  taskName: z.string(),
  checked: z.object({
    color: z.string(),
    id: z.string(),
    name: z.string(),
  }),
});

export const Tasks = z.array(Task);

export type Task = z.infer<typeof Task>;

export const TaskSchema = {
  Task,
  Tasks,
};

export const getTasks = makeEndpoint({
  method: "get",
  path: "tasks",
  alias: "getTasks",
  parameters: [
    {
      type: "Body",
      name: "getTasksPayload",
      schema: TaskSchema.Task.partial(),
    },
  ],
  response: TaskSchema.Tasks,
});
