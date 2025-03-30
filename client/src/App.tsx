import "./App.css";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { TaskForm } from "@/components/TaskForm/TaskForm.tsx";
import { TaskList } from "@/components/TaskList/TaskList.tsx";
const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <TaskForm />
      <TaskList />
    </QueryClientProvider>
  );
}

export default App;
