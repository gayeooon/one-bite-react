import { useContext, useMemo, useState } from "react";
import { TodoStateContext } from "../App";
import "./TodoList.css";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todo = useContext(TodoStateContext);
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearchResult = () => {
    return search === ""
      ? todo
      : todo.filter((it) => it.content.toLowerCase().includes(search));
  };
  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDonecount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDonecount,
    };
  }, [todo]);
  const { totalCount, doneCount, notDonecount } = analyzeTodo;

  return (
    <div className="TodoList">
      <h3>Todo List 🌱</h3>
      <div>
        <div>총개수: {totalCount}</div>
        <div>완료된 할 일: {doneCount}</div>
        <div>아직 완료하지 못한 할 일: {notDonecount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
        className="searchbar"
      ></input>
      <div className="list_wrapper">
        {getSearchResult().map((it) => (
          <TodoItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

TodoList.defaultProps = {
  todo: [],
};

export default TodoList;
