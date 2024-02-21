// ✨ 카테고리 버튼 리스트

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryListState, currCategoryState, openModalState } from '../atoms';
import AddCategoryModal from './AddCategoryModal';

export default function CategoryList() {
  const categories = useRecoilValue(categoryListState);
  const [currCategory, setCurrCategory] = useRecoilState(currCategoryState);
  const setOpenModal = useSetRecoilState(openModalState);
  const openModal = () => {
    setOpenModal(true);
  };

  return (
    <div>
      {categories.map((category) => (
        <li>
          <button
            onClick={() => {
              setCurrCategory(category);
            }}
          >
            {category}
          </button>
        </li>
      ))}
      <button onClick={openModal}>+</button>
      <AddCategoryModal />
    </div>
  );
}
