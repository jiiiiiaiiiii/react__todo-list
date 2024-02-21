import { useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from './atoms';

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const changeCategory = (newCategory: IToDo['category']) => { // IToDo의 category 인터페이스를 가져옴
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: newCategory };
      // console.log(oldToDo, newToDo);

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
      return [...oldToDos.slice(0, targetIndex), ...oldToDos.slice(targetIndex + 1)]
    })
  };

  return (
    <li>
      <span>{text} </span>
      {category !== Categories.DOING && (
        <button onClick={() => changeCategory(Categories.DOING)}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => changeCategory(Categories.TO_DO)}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => changeCategory(Categories.DONE)}>Done</button>
      )}
      <button onClick={deleteToDo}>Del</button>
    </li>
  );
}

export default ToDo;
