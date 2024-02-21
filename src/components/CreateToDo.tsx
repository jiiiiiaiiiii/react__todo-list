// ✨ 할일 목록(To do list) 추가

import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currCategoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
  const currCategory = useRecoilValue(currCategoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const addToDo = ({toDo}: IForm) => {
    setToDos((oldToDos) => [{text: toDo, id:Date.now(), category: currCategory }, ...oldToDos]);
		setValue('toDo', '');	// input 초기화
  }

  return (
    <>
      <form onSubmit={handleSubmit(addToDo)}>
        <input
          {...register('toDo', {
            required: true,
          })}
          placeholder='Please write a To Do...!'
        />
        <button>Add</button>
      </form>
    </>
  );
}

export default CreateToDo;
