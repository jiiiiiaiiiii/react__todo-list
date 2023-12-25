import { log } from 'console';
import React, { useState } from 'react';

function ToDoList() {
	const [toDo, setTodo] = useState('');
	const onChange = (e:React.FormEvent<HTMLInputElement>) => {
		const {currentTarget: {value},} = e;
		setTodo(value);
	};
	const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(toDo);
		
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={toDo} onChange={onChange} placeholder='Write a to do' />
				<button>Add</button>
			</form>
		</div>
	)
}

export default ToDoList;