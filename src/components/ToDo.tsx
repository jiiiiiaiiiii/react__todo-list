// ✨ 카테고리별 할일 목록

import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  IToDo,
  toDoState,
  currCategoryState,
  categoryListState,
} from '../atoms';

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const currCategory = useRecoilValue(currCategoryState);
  const categories = useRecoilValue(categoryListState);
  const changeCategory = (newCategory: IToDo['category']) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text} </span>
      {categories.map(
        (category) =>
          category !== currCategory && (
            <button
              key={category}
              onClick={() => {
                changeCategory(category);
              }}
            >
              {category}
            </button>
          )
      )}
      <button onClick={deleteToDo}>Del</button>
    </li>
  );
}

export default ToDo;
