import React from 'react';
import { FilterValuesType } from './App';

export type Task = {
  id: number;
  isDone: boolean;
  title: string;
};
type TodoListPropsType = {
  tasks: Task[];
  title: string;
  removeTask: (id: number) => void;
  changeFilter: (value: FilterValuesType) => void;
};

function TodoList(props: TodoListPropsType) {
  const { tasks, title, removeTask, changeFilter } = props;

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {tasks.map((i) => {
          return (
            <li key={i.id}>
              <input type="checkbox" checked={i.isDone} />
              <span>{i.title}</span>
              <button onClick={() => removeTask(i.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => changeFilter('all')}>All</button>
        <button onClick={() => changeFilter('active')}>Active</button>
        <button onClick={() => changeFilter('completed')}>Completed</button>
      </div>
    </div>
  );
}

export default TodoList;
