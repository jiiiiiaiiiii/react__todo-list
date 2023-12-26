import { atom, selector } from 'recoil';

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
})

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  }
})