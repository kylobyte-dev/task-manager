import "./App.css";

import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/TaskForm/TaskForm.tsx";
import { TaskList } from "@/components/TaskList/TaskList.tsx";

const BE_URL = import.meta.env.VITE_BE_URL;

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
      <TaskList />
    </>
  );
}

export default App;
