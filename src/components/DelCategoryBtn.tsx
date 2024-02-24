// ✨ 현재 카테고리 삭제 버튼

import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryListState, currCategoryState, toDoState } from '../atoms';

const DelBtn = styled.button`
  margin-top: 20px;
  border: none;
  display: inline-block;
  font-size: 25px;
  background: none;
  color: ${(props) => props.theme.textColor};
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

export default function DelCategoryBtn() {
  const [currCategory, setCurrCategory] = useRecoilState(currCategoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const delCategory = () => {
    // 최소 1개 이상의 카테고리
    if (categoryList.length === 1) {
      alert('At least one category is required.');
      return null;
    }

    //현재 카테고리 내에 있던 toDos 삭제
    setToDos(toDos.filter((todo) => todo.category !== currCategory));

    // 현재 카테고리 삭제
    setCategoryList((prev) => {
      const targetIndex = categoryList.indexOf(currCategory);
      return [...prev.slice(0, targetIndex), ...prev.slice(targetIndex + 1)];
    });

    // currCategory를 0번 인덱스로
    if (currCategory !== categoryList[0]) {
      setCurrCategory(categoryList[0]);
    } else {
      setCurrCategory(categoryList[1]);
    }
  };

  return <DelBtn onClick={delCategory}>Delete this category</DelBtn>;
}
