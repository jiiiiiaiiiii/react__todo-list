// ✨ 카테고리 버튼 리스트

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryListState, currCategoryState, openModalState } from '../atoms';
import AddCategoryModal from './AddCategoryModal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    color: whitesmoke;
    padding: 20px;
    border: none;
    border-radius: 15px;
    margin: 25px 15px;
    font-size: 30px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15);
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const Categories = styled.li`
  list-style: none;
`;

const CategoryBtn = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.clickTabColor : props.theme.tabColor};
  &:hover {
    background-color: ${(props) => props.theme.clickTabColor};
  }
`;

const AddBtn = styled.button`
  width: 150px;
  background-color: ${(props) => props.theme.tabColor};
  &:hover {
    background-color: ${(props) => props.theme.clickTabColor};
  }
`;

export default function CategoryList() {
  const categories = useRecoilValue(categoryListState);
  const [currCategory, setCurrCategory] = useRecoilState(currCategoryState);
  const setOpenModal = useSetRecoilState(openModalState);
  const openModal = () => {
    setOpenModal(true);
  };

  return (
    <Wrapper>
      {categories.map((category) => (
        <Categories>
          <CategoryBtn
            isActive={currCategory === category}
            onClick={() => {
              setCurrCategory(category);
            }}
          >
            {category}
          </CategoryBtn>
        </Categories>
      ))}
      <AddBtn onClick={openModal}>+</AddBtn>
      <AddCategoryModal />
    </Wrapper>
  );
}
