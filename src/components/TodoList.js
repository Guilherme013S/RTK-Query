import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  useGetAllTodoQuery,
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../Redux/api/apiSlice";
import { nanoid } from "@reduxjs/toolkit";
import Form from "./Form";
import Todo from "./Todo";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const { data, isLoading, isSuccess, isError, error } = useGetAllTodoQuery();
  const [addTodo] = useAddNewTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      userid: 8,
      id: Number(nanoid),
      title: newTodo,
      completed: false,
    });
    setNewTodo("");
  };

  return (
    <main id="animeLeft">
      <h1>Todo List</h1>
      {isLoading ? (
        <div id="loading"></div>
      ) : isSuccess ? (
        <>
          <Form
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            handleSubmit={handleSubmit}
          />
          <div>
            {data.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))}
          </div>
        </>
      ) : (
        isError(<p>{error}</p>)
      )}
    </main>
  );
};
export default TodoList;
