import "./App.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  taskName: z.string(),
});

const BE_URL = import.meta.env.VITE_BE_URL;

export function TaskForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    axios
      .post(`${BE_URL}/tasks`, {
        name: values.taskName,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is the task</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

function App() {
  return (
    <>
      <Button
        type="button"
        onClick={() => {
          fetch(BE_URL)
            .then((response) => response.json())
            .then((payload) => {
              console.log(payload);
            });
        }}
      >
        Get Tasks
      </Button>
      <TaskForm />
    </>
  );
}

export default App;
