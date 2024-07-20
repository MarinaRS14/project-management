import { ChangeEvent, KeyboardEvent, useState } from 'react';
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
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

function TodoList(props: TodoListPropsType) {
  const { tasks, title, removeTask, changeFilter, addTask, changeStatus, filter } = props;

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<null | string>(null);
  // const [active, setActive] = useState<FilterValuesType>('all');

  const createTask = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  const onAllClickHandler = () => changeFilter('all');
  const onCompletedClickHandler = () => changeFilter('completed');
  const onActiveClickHandler = () => changeFilter('active');

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={onChangeInputHandler}
          onKeyUp={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={createTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {tasks.map((i) => {
          const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(i.id, e.currentTarget.checked);
          };

          return (
            <li key={i.id}>
              <input type="checkbox" checked={i.isDone} onChange={onChangeCheckboxHandler} />
              <span>{i.title}</span>
              <button onClick={() => removeTask(i.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={onAllClickHandler} className={filter === 'all' ? 'active-filter' : ''}>
          All
        </button>
        <button
          onClick={onActiveClickHandler}
          className={filter === 'active' ? 'active-filter' : ''}>
          Active
        </button>
        <button
          onClick={onCompletedClickHandler}
          className={filter === 'completed' ? 'active-filter' : ''}>
          Completed
        </button>
      </div>
    </div>
  );
}

export default TodoList;
