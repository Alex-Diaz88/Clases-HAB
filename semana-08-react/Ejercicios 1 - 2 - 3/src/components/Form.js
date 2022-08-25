import { useState } from "react";

const Form = (props) => {
  const { tasks, setTasks } = props;

  const [task, setTask] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const newTask = {
          id: tasks.length + 1,
          task: task,
          done: false,
        };

        setTasks([...tasks, newTask]);

        setTask("");
      }}
    >
      <label htmlFor="task">Tarea</label>
      <input
        type="text"
        maxLength="100"
        id="task"
        value={task}
        onChange={(event) => {
          setTask(event.target.value);
        }}
        required
      />
      <button type="submit">Añadir Tarea</button>
    </form>
  );
};

export default Form;
