// ✨ Home

import { useRecoilValue } from 'recoil';
import { toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import CategoryList from './CategoryList';
import DelCategoryBtn from './DelCategoryBtn';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector); // selector로 필터링된 값

  return (
    <>
      <div>{/* 사진 */}</div>
      <div>
        <h1>To do List</h1>
        <CategoryList />
        <CreateToDo />
        <hr />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
        <DelCategoryBtn />
      </div>
    </>
  );
}

export default ToDoList;
