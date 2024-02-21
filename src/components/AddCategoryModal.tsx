// ✨ 카테고리 추가 버튼 클릭 -> 모달창

import { useRecoilState, useSetRecoilState } from 'recoil';
import { categoryListState, openModalState } from '../atoms';
import { useForm } from 'react-hook-form';

interface IName {
	add: string;
}

export default function AddCategoryModal() {
	const {register, handleSubmit, setValue } = useForm<IName>();
  const [openModal, setOpenModal] = useRecoilState(openModalState);
	const setCategoryList = useSetRecoilState(categoryListState);
  const closeModal = () => {
		setValue('add', '');
    setOpenModal(false);
  };
	const addCategory = ({add}: IName) => {
		setValue('add', '');
		setOpenModal(false);
		setCategoryList((prev) => {return [...prev, add]});
	};
  return (
    <>
      {openModal && 
        <form onSubmit={handleSubmit(addCategory)}>
					<input {...register('add')} placeholder='New category name?'/>
					<button>Add</button>
          <button onClick={closeModal}>X</button>
        </form>
      }
    </>
  );
}
