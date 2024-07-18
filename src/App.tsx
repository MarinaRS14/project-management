import { useState } from 'react';
import './App.css';
import TodoList, { Task } from './TodoList';
import { v1 } from 'uuid';

let tasks1: Task[] = [
  {
    id: v1(),
    isDone: true,
    title: 'HTML',
  },
  {
    id: v1(),
    isDone: false,
    title: 'CSS',
  },
  {
    id: v1(),
    isDone: false,
    title: 'JS',
  },
  {
    id: v1(),
    isDone: true,
    title: 'Radix',
  },
];

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState<Task[] | []>(tasks1);
  const [filterTask, setFilterTask] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    setTasks((tasks) => tasks.filter((i) => i.id !== id));
  };

  const addTask = (value: string) => {
    let newTask = { id: v1(), isDone: false, title: value };
    setTasks((tasks) => [newTask, ...tasks]);
  };

  let tasksForTodoList = tasks;
  if (filterTask === 'completed') {
    tasksForTodoList = tasks.filter((i) => i.isDone === true);
    console.log(tasksForTodoList);
  }
  if (filterTask === 'active') {
    tasksForTodoList = tasks.filter((i) => i.isDone === false);
  }

  function changeFilter(value: FilterValuesType) {
    setFilterTask(value);
  }

  return (
    <div className="App">
      <TodoList
        title="Study"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
    </div>
  );
}
export default App;
