// ✨ 카테고리 버튼 리스트

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryListState, currCategoryState, openModalState } from '../atoms';
import AddCategoryModal from './AddCategoryModal';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 30px;
  button {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    max-width: 150px;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    padding: 20px;
    border: none;
    font-size: 24px;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const Categories = styled.li`
  list-style: none;
`;

const CategoryBtn = styled.button<{ isActive: boolean }>`
  background: none;
  font-weight: ${(props) => props.isActive ? 'bold' : 'none'};
  /* text-decoration: wavy; */
  color: ${(props) =>
    props.isActive ? props.theme.clickTabColor : props.theme.tabColor};
  &:hover {
    color: ${(props) => props.theme.clickTabColor};
    
  }
`;

const AddBtn = styled.button`
  width: 100px;
  height: 60px;
  line-height: 24px;
  margin-right: 15px;
  border-radius: 15px;
  color: whitesmoke;
  font-size: 22px;
  box-shadow: 4px 5px 5px rgba(0, 0, 0, 0.2);
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
      <AddBtn onClick={openModal}>New</AddBtn>
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
      <AddCategoryModal />
    </Wrapper>
  );
}
