import Task from "./Task";

const TaskList = (props) => {
  const { tasks } = props;
  console.log(tasks);
  return (
    <ul>
      {tasks.map((taskObject) => {
        const { id, task, done } = taskObject;

        return (
          <li key={id}>
            <Task id={id} task={task} done={done} />
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
