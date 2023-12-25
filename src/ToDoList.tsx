import { log } from 'console';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/* function ToDoList() {
	const [toDo, setTodo] = useState('');
	const [toDoError, setToDoError] = useState('');
	const onChange = (e:React.FormEvent<HTMLInputElement>) => {
		const {currentTarget: {value},} = e;
		setToDoError('');
		setTodo(value);
	};
	const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(toDo.length < 10) {
			return setToDoError('To do should be longer')
		} 
		console.log('submit');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input value={toDo} onChange={onChange} placeholder='Write a to do' />
				<button>Add</button>
				{toDoError !== '' ? toDoError : null}
			</form>
		</div>
	)
} */


function ToDoList() {
	const {register, watch} = useForm();	// watch: input값의 변화
	console.log(watch());
	
	return (
		<div>
			<form>
				<input {...register('Email')} placeholder='Email' />
				<input {...register('FirstName')} placeholder='FirstName' />
				<input {...register('LastName')} placeholder='LastName' />
				<input {...register('UserName')} placeholder='UserName' />
				<input {...register('Password')} placeholder='Password' />
				<input {...register('PasswordConfirm')} placeholder='PasswordConfirm' />
				<button>Add</button>
			</form>
		</div>
	)
}

export default ToDoList;