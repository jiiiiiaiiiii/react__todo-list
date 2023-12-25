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


interface IForm {
	email: string;
	FirstName: string;
	LastName: string;
	UserName: string;
	Password: string;
	PasswordConfirm: string;
}

function ToDoList() {
	const {register, handleSubmit, formState: {errors}} = useForm<IForm>({
		defaultValues: {
			email: '@naver.com',
		}
	});
	const onValid = (data: any) => {
		console.log(data);
	}
	console.log(errors); // 각 input의 유효성 error 확인
	
	return (
		<div>
			<form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit(onValid)}>
				<input {...register('email', {
					required: 'Email is required', 
					pattern: {
						value: /^[A-Za-z0-9._%+-]+@naver.com$/,
						message: 'Only naver.com emails allowed'}
					}
				)} placeholder='Email' />
				<span>{errors?.email?.message as string}</span>
				<input {...register('FirstName', {required: 'required'})} placeholder='FirstName' />
				<span>{errors?.FirstName?.message as string}</span>
				<input {...register('LastName', {required: 'required'})} placeholder='LastName' />
				<span>{errors?.LastName?.message as string}</span>
				<input {...register('UserName', {required: 'required', minLength: 5})} placeholder='UserName' />
				<span>{errors?.UserName?.message as string}</span>
				<input {...register('Password', {required: 'required', minLength: 10})} placeholder='Password' />
				<span>{errors?.Password?.message as string}</span>
				<input {...register('PasswordConfirm', {
					required: 'Password is required', 
					minLength: {
						value: 5,
						message: 'Your password is too short'
					},
				})} placeholder='PasswordConfirm' />
				<span>{errors?.PasswordConfirm?.message as string}</span>
				<button>Add</button>
			</form>
		</div>
	)
}

export default ToDoList;