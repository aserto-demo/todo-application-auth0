import React, { useContext } from "react";
import { ITodo, ITodoService, IUser } from "./interfaces";

const serviceContext = React.createContext({ token: "" });

export const useTodoService: () => ITodoService = () => {
  const { token } = useContext(serviceContext);
  const headers: Headers = new Headers();

  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const listTodos: () => Promise<ITodo[]> = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_ORIGIN}/todos`, {
      headers: headers,
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  const saveTodo: (
    todo: ITodo,
    isUpdate?: boolean
  ) => Promise<ITodo[]> = async (todo, isUpdate = false) => {
    const baseUrl = `${process.env.REACT_APP_API_ORIGIN}/todo`
    const url = isUpdate ? baseUrl + "/" + todo.OwnerID : baseUrl;
    const response = await fetch(url, {
      method: isUpdate ? "PUT" : "POST",
      headers: headers,
      body: JSON.stringify(todo),
    });

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  const deleteTodo: (todo: ITodo) => Promise<void | Response> = async (
    todo
  ) => {
    const response: Response = await fetch(
      `${process.env.REACT_APP_API_ORIGIN}/todo/${todo.OwnerID}`,
      {
        method: "DELETE",
        body: JSON.stringify(todo),
        headers: headers,
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  const getUser: (userId: string) => Promise<IUser> = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ORIGIN}/user/${userId}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (response.status === 200) {
      const user = await response.json();
      return user;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  };

  return {
    listTodos,
    saveTodo,
    deleteTodo,
    getUser,
  };
};

export type ServiceProps = {
  token: string;
};

const TodoService: React.FC<React.PropsWithChildren<ServiceProps>> = ({
  children,
  token,
}) => {
  return (
    <serviceContext.Provider value={{ token }}>
      {children}
    </serviceContext.Provider>
  );
};

export default TodoService;
