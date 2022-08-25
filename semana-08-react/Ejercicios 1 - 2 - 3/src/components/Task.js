import { useState } from "react";
import tasksDB from "../db/tasksMuestra";

const Task = (props) => {
  const { id, task, done: initialDone } = props;
  const [done, setDone] = useState(initialDone);
  const [tasks, setTasks] = useState(tasksDB);

  return (
    <section>
      <p
        style={{
          textDecoration: done === true ? "line-through" : "initial",
        }}
      >
        {task}
      </p>
      <label htmlFor="done">Done:</label>
      <input
        id="done"
        type="checkbox"
        checked={done}
        onChange={(event) => {
          setDone(event.target.checked);
        }}
        onClick={() => {
          tasks.map((task) => {
            if (task.id === id) {
              task.done = !task.done;
            }
            return task;
          });
          setTasks([...tasks]);
        }}
      />
    </section>
  );
};

export default Task;
