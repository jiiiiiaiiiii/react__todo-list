import { atom, selector } from 'recoil';
//✨selector: derived state(파생된 상태)
// --> state를 가져다가(state는 변경❌) -> atom의 변경된 output⭕을 return)

export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO'|'DOING'|'DONE';
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({get}) => { // get Fn: selector의 내부로 atom을 가지고 올 수 있음
    const toDos = get(toDoState); // toDos에 모든 todo가 할당
    return [
      toDos.filter(toDo => toDo.category === 'TO_DO'),
      toDos.filter(toDo => toDo.category === 'DOING'),
      toDos.filter(toDo => toDo.category === 'DONE'),
    ];
  }
})