// ✨ Home

import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { openModalState, toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';
import CategoryList from './CategoryList';
import DelCategoryBtn from './DelCategoryBtn';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    &:hover{cursor: pointer;}
  }
`;

const Img = styled.img`
  height: 100vh;
  width: 40vw;
`;

const TodoListContainer = styled.div`
  height: 100vh;
  width: 60vw;
  min-width: 1000px;
  text-align: center;  
`;

const Title = styled.h1`
  margin: 40px auto 20px;
  color: ${(props) => props.theme.accentColor};
  font-weight: bold;
  font-size: 55px;
  text-align: center;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const TodoContainer = styled.div`
  min-height: 200px;
  margin: 20px 40px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
  button {
    height: 20px;
    font-size: 13px;
  }
`;

const EmptySpan = styled.span`
  font-size: 30px;
  text-align: center;
  color: ${(props) => props.theme.etcColor};
  display: inline-block;
  margin-top: 65px;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector); // selector로 필터링된 값
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  return (
    <Wrapper>
      {/* { screen.width >= 1000 ? <Img src='../Img/waterfall.jpeg' /> : null} */}
      <TodoListContainer>
        <Title>To do List</Title>
        <CategoryList />
        <CreateToDo />
        <hr />
        <TodoContainer>
          {toDos.length == 0 ? (
            <EmptySpan>Empty...👀</EmptySpan>
          ) : (
            toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)
          )}
        </TodoContainer>
        <DelCategoryBtn />
      </TodoListContainer>
      {openModal && (
        <Overlay
          onClick={() => {
            setOpenModal(false);
          }}
        />
      )}
    </Wrapper>
  );
}

export default ToDoList;
