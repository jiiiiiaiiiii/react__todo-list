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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    &:hover{cursor: pointer;}
  }
`;

const TodoListContainer = styled.div`
  height: 90vh;
  width: 70%;
  max-width: 800px;
  border-radius: 10px;
  text-align: center;
  background-color: #E7E9EE;
  overflow: hidden;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 20px;
  background-color: ${props => props.theme.tabColor};
  text-align: left;
  box-shadow: 4px 5px 8px rgba(0, 0, 0, 0.2);
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    color: white;
    &:first-child {
      background-color: #E4585B;
    }
    &:nth-child(2) {
      background-color: #ECAE3F;
    }
    &:nth-child(3) {
      background-color: #3BB34F;
    }
  }
`;

const Title = styled.h1`
  display: inline-block;
  padding: 8px 10px;
  color: whitesmoke;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const TodoContainer = styled.div`
  min-height: 250px;
  max-height: 370px;
  margin: 5px 30px;
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 4px 5px 3px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
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
  margin-top: 90px;
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
      <TodoListContainer>
        <Header>
          <span></span>
          <span></span>
          <span></span>
          <Title>To do List</Title>
        </Header>
        <CategoryList />
        <hr />
        <CreateToDo />
        <TodoContainer>
          {toDos.length == 0 ? (
            <EmptySpan>Empty</EmptySpan>
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
