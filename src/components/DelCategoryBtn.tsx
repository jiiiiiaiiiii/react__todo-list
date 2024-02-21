// ✨ 현재 카테고리 삭제 버튼

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryListState, currCategoryState } from '../atoms';

export default function DelCategoryBtn() {
  const [currCategory, setCurrCategory] = useRecoilState(currCategoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const delCategory = () => {
		// 최소 1개 이상의 카테고리
    if (categoryList.length === 1) {
      alert('At least one category is required.');
			return null;
    }

    // 현재 카테고리 삭제
    setCategoryList((prev) => {
      const targetIndex = categoryList.indexOf(currCategory);
      return [...prev.slice(0, targetIndex), ...prev.slice(targetIndex + 1)];
    });

    // currCategory를 0번 인덱스로
    setCurrCategory(categoryList[0]);
  };
  return (
    <div>
      <button onClick={delCategory}>Delete this category</button>
    </div>
  );
}
