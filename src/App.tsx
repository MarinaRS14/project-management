import { useState } from 'react';
import './App.css';
import TodoList, { Task } from './TodoList';

let tasks1: Task[] = [
  {
    id: 1,
    isDone: true,
    title: 'HTML',
  },
  {
    id: 2,
    isDone: false,
    title: 'CSS',
  },
  {
    id: 3,
    isDone: false,
    title: 'JS',
  },
  {
    id: 4,
    isDone: true,
    title: 'Radix',
  },
];

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState<Task[] | []>(tasks1);
  const [filterTask, setFilterTask] = useState<FilterValuesType>('all');

  // const [done, setDone] = useState(false);

  const removeTask = (id: number) => {
    setTasks((tasks) => tasks.filter((i) => i.id !== id));
  };

  let tasksForTodoList = tasks;
  if (filterTask === 'completed') {
    tasksForTodoList = tasks.filter((i) => i.isDone == true);
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
      />
    </div>
  );
}
export default App;
