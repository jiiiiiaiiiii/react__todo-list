// ✨ 할일 목록(To do list) 추가

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currCategoryState, toDoState } from '../atoms';

const Wrapper = styled.div`
  padding: 0 30px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height: 65px;
  font-size: 24px;
  margin-right: 25px;
  border: none;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  background-color: white;
  box-shadow: 4px 5px 5px rgba(0, 0, 0, 0.2);
`;

const AddBtn = styled.button`
  width: 100px;
  height: 65px;
  margin: 25px 0;
  font-size: 22px;
  border: none;
  border-radius: 15px;
  color: whitesmoke;
  box-shadow: 4px 5px 5px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.theme.clickTabColor};
  &:hover {
    background-color: ${(props) => props.theme.tabColor};
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const currCategory = useRecoilValue(currCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const addToDo = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: currCategory },
      ...oldToDos,
    ]);
    setValue('toDo', ''); // input 초기화
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(addToDo)}>
        <Input autoFocus
          {...register('toDo', {
            required: true,
          })}
          placeholder='Write a To Do...!'
        />
        <AddBtn>Add</AddBtn>
      </Form>
    </Wrapper>
  );
}

export default CreateToDo;
