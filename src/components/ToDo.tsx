import { IToDo } from './atoms';

function ToDo({ text, category }: IToDo) {
  const onClick = (newCategory: IToDo['category']) => {	// IToDo의 category 인터페이스를 가져옴
		console.log(newCategory);
		
	};

  return (
    <li>
      <span>{text} </span>
      {category !== 'DOING' && (
        <button onClick={() => onClick('DOING')}>Doing</button>
      )}
      {category !== 'TO_DO' && (
        <button onClick={() => onClick('TO_DO')}>To Do</button>
      )}
      {category !== 'DONE' && (
        <button onClick={() => onClick('DONE')}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
