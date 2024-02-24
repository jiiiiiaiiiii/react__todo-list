// ✨ 카테고리 추가 버튼 클릭 -> 모달창

import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryListState, currCategoryState, openModalState } from '../atoms';
import { useForm } from 'react-hook-form';

const Form = styled.form`
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 300px;
  height: 150px;
  width: 700px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  margin: 25px 15px;
  font-size: 30px;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.etcColor};
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const AddBtn = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  &:hover {
    background-color: ${(props) => props.theme.etcColor};
  }
`;

const CloseBtn = styled.button`
  background-color: ${(props) => props.theme.etcColor};
  &:hover {
    color: black;
  }
`;

interface IName {
  add: string;
}

export default function AddCategoryModal() {
  const { register, handleSubmit, setValue } = useForm<IName>();
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const setCurrCategory = useSetRecoilState(currCategoryState);
  const closeModal = () => {
    setValue('add', '');
    setOpenModal(false);
  };
  const addCategory = ({ add }: IName) => {
    if (!categoryList.includes(add)) {
      setValue('add', '');
      setOpenModal(false);
      setCategoryList((prev) => {
        return [...prev, add];
      });
    } else {
      // 기존 사용 카테고리명 제외
      alert('The name already exists...');
    }
    setCurrCategory(add);
  };
  return (
    <>
      {openModal && (
        <Form onSubmit={handleSubmit(addCategory)}>
          <Input
            autoFocus
            {...register('add', {
              required: true,
            })}
            placeholder='New category name?'
          />
          <AddBtn>Add</AddBtn>
          <CloseBtn onClick={closeModal}>X</CloseBtn>
        </Form>
      )}
    </>
  );
}
