import { useForm } from 'react-hook-form';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO'|'DOING'|'DONE';
}

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
})


function ToDoList() {
  // const toDos = useRecoilValue(toDoState);       // 1. useRecoilValue: atom에서 값 불러오기
  // const setToDos = useSetRecoilState(toDoState);    // 2. useSetRecoilState: atom에서 불러온 값 수정
  const [toDos, setToDos] = useRecoilState(toDoState); // 3. useRecoilState: 1 + 2
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({toDo}: IForm) => {
    setToDos((oldToDos) => [{text: toDo, id:Date.now(), category: 'TO_DO'}, ...oldToDos]);
		setValue('toDo', '');	// input 초기화
  };

  console.log(toDos);
  
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('toDo', {
            required: 'Please write a To Do!',
          })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
      </ul>
    </div>
  );
}

export default ToDoList;
