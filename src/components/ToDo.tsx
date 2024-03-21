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
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  list-style: none;
  font-size: 22px;
  margin: 20px;
  text-align: left;
  &:not(:first-child) {
    border-top: 2px dashed ${(props) => props.theme.etcColor};
    padding-top: 20px;
  }
`;

const BtnContainer = styled.div`
  button {
    margin-left: 8px;
  }
`;

const CategoryBtn = styled.button`
  border: none;
  border-radius: 5px;
  border: 1px solid #cfd0d4;
  background-color: ${(props) => props.theme.bgColor};
  &:hover {
    background-color: #c2c3c5;
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
      <BtnContainer>
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
      </BtnContainer>
    </ToDoList>
  );
}

export default ToDo;
