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
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    // console.log(data);
    if (data.Password !== data.PasswordConfirm) {
      setError(
        'PasswordConfirm',
        { message: 'Passwords are not the same.' },
        { shouldFocus: true } // PasswordConfirm로 커서 자동 포커스
      );
    }
    // setError('extraError', {message: 'Server offline.'});	// 특정 항목이 아닌, 전체 form에 해당되는 error
  };
  console.log(errors); // 각 input의 유효성 error 확인

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder='Email'
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('FirstName', {
            required: 'required',
            validate: {	//✨Custom Validation
              noAqubi: (value) =>
                value.includes('aqubi') ? '"aqubi" is not allowed' : true,
              noZeze: (value) =>
                value.includes('zeze') ? '"zeze" is not allowed' : true,
            },
          })}
          placeholder='FirstName'
        />
        <span>{errors?.FirstName?.message}</span>
        <input
          {...register('LastName', { required: 'required' })}
          placeholder='LastName'
        />
        <span>{errors?.LastName?.message}</span>
        <input
          {...register('UserName', { required: 'required', minLength: 5 })}
          placeholder='UserName'
        />
        <span>{errors?.UserName?.message}</span>
        <input
          {...register('Password', { required: 'required', minLength: 10 })}
          placeholder='Password'
        />
        <span>{errors?.Password?.message}</span>
        <input
          {...register('PasswordConfirm', {
            required: 'Password is required',
            minLength: {
              value: 10,
              message: 'Your password is too short',
            },
          })}
          placeholder='PasswordConfirm'
        />
        <span>{errors?.PasswordConfirm?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
