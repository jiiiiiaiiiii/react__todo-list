// ✨ 카테고리별 할일 목록

import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  IToDo,
  toDoState,
  currCategoryState,
  categoryListState,
} from '../atoms';

const ToDoList = styled.li`
  position: relative;
  display: block;
  list-style: none;
  font-size: 25px;
  margin:  30px;
  text-align: left;
  &:not(:first-child) {
    border-top: 2px dashed ${props => props.theme.etcColor};
    padding-top: 30px;
  }
`;

const CategoryBtn = styled.button`
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    background-color: ${(props) => props.theme.tabColor};
  }
`;

const DeleteBtn = styled.button`
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #f99c95;
  &:hover {
    background-color: #f25448;
  }
`;

function ToDo({ text, id, category }: IToDo) {
  const [toDos, setToDos] = useRecoilState(toDoState);
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
    <ToDoList>
      <span>{text}</span>
      {categories.map(
        (category) =>
          category !== currCategory && (
            <CategoryBtn
              key={category}
              onClick={() => {
                changeCategory(category);
              }}
            >
              {category}
            </CategoryBtn>
          )
      )}
      <DeleteBtn onClick={deleteToDo}>X</DeleteBtn>
    </ToDoList>
  );
}

export default ToDo;
