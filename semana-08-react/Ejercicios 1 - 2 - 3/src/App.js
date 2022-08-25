import { useState } from "react";
import tasksDB from "./db/tasksMuestra";
import TaskList from "./components/TaskList";
import Form from "./components/Form";

function App() {
  const [tasks, setTasks] = useState(tasksDB);

  return (
    <div className="App">
      <h1>Tareas</h1>
      <Form tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
