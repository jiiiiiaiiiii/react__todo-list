import { IToDo } from './atoms';

function ToDo({ text, category }: IToDo) {
  const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {	// IToDo의 category 인터페이스를 가져옴
		const {currentTarget: {name}, } = e;
		console.log(e.currentTarget.name);
	};

  return (
    <li>
      <span>{text} </span>
      {category !== 'DOING' && (
        <button name='DOING' onClick={onClick}>Doing</button>
      )}
      {category !== 'TO_DO' && (
        <button name='TO_DO' onClick={onClick}>To Do</button>
      )}
      {category !== 'DONE' && (
        <button name='DONE' onClick={onClick}>Done</button>
      )}
    </li>
  );
}

export default ToDo;
