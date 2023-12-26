import { useRecoilState, useRecoilValue } from 'recoil';
import { toDoSelector, categoryState } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState); 
  const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };
  
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>
      <CreateToDo />
      {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo} />)}
    </div>
  );
}

export default ToDoList;
