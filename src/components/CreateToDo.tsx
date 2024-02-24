// ✨ 할일 목록(To do list) 추가

import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currCategoryState, toDoState } from '../atoms';

const Wrapper = styled.div``;

const Form = styled.form``;

const Input = styled.input`
  width: 70%;
  font-size: 30px;
  margin-right: 10px;
  border: none;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  background-color: white;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const AddBtn = styled.button`
  width: 150px;
  padding: 20px;
  margin: 25px 15px;
  border: none;
  border-radius: 15px;
  font-size: 30px;
  color: whitesmoke;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15);
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
