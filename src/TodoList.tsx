import React, { useState } from 'react';
import { FilterValuesType } from './App';

export type Task = {
  id: string;
  isDone: boolean;
  title: string;
};
type TodoListPropsType = {
  tasks: Task[];
  title: string;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (value: string) => void;
};

function TodoList(props: TodoListPropsType) {
  const { tasks, title, removeTask, changeFilter, addTask } = props;

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const createTask = () => {
    if (newTaskTitle !== '') {
      addTask(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              createTask();
            }
          }}
        />
        <button onClick={createTask}>+</button>
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
