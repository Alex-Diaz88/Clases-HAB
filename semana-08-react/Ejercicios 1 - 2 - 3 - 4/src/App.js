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
      <section>
        <h2>Enlaces:</h2>
        {/* Pensé que tendría que utilizar <img
        src={process.env.PUBLIC_URL + "/foto.jpg"}
        alt="foto front-backend"/>  pero funcionó de esta manera...*/}
        <a href="http://localhost:3000/foto.jpg">Ir a Foto</a>

        <a href={process.env.REACT_APP_DOUBTS}>Necesitas ayuda?</a>
      </section>
    </div>
  );
}

export default App;
