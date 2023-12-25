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
	const {register, handleSubmit, formState} = useForm();	// watch: input값의 변화
	const onValid = (data: any) => {
		console.log(data);
	}
	console.log(formState.errors); // 각 input의 유효성 error 확인
	
	return (
		<div>
			<form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onValid)}>
				<input {...register('Email', {required: true})} placeholder='Email' />
				<input {...register('FirstName', {required: true})} placeholder='FirstName' />
				<input {...register('LastName', {required: true})} placeholder='LastName' />
				<input {...register('UserName', {required: true, minLength: 5})} placeholder='UserName' />
				<input {...register('Password', {required: true, minLength: 10})} placeholder='Password' />
				<input
					{...register('PasswordConfirm', {
						required: 'Password is required', 
						minLength: {
							value: 5,
							message: 'Your password is too short'
						},
					})} placeholder='PasswordConfirm' />
				<button>Add</button>
			</form>
		</div>
	)
}

export default ToDoList;