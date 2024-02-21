import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

/* ✨ for persist
- 1. localStorage : 로컬에 도메인별로 지속되는 storage (브라우저를 닫아도 사라지지 않음)
- 2. sessionStorage : 세션이(탭, 브라우저)가 종료될 때까지 지속되는 storage (브라우저를 닫으면 사라짐)

const { persistAtom } = recoilPersist({
  key: "localStorage" | 'sessionStorage', //원하는 key 값 입력
  storage: localStorage | sessionStorage,
}) */

// for save in localStorage
const {persistAtom} = recoilPersist();

export enum Categories {
  'TO_DO'= 'TO_DO', // 'TO_DO', 로 할 경우 -> 실제 값은 숫자 '0'임(인덱스값)
  'DOING'= 'DOING',
  'DONE' = 'DONE'
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
  effects_UNSTABLE: [ persistAtom ],
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
  effects_UNSTABLE: [ persistAtom ],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
})