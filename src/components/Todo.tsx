import React, { useEffect, useState } from "react";
import { TodoProps, User } from "../interfaces";
import { useTodoService } from "../todoService";

export const Todo: React.FC<TodoProps> = (todoProps) => {
  const [user, setUser] = useState<User>();
  const { getUser } = useTodoService();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes: User = await getUser(todoProps.todo.OwnerID);
        setUser(userRes);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li className={todoProps.todo.Completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() =>
            todoProps.handleCompletedChange(
              todoProps.todo.ID,
              !todoProps.todo.Completed
            )
          }
          checked={todoProps.todo.Completed}
        />
        <label
          onClick={() =>
            todoProps.handleCompletedChange(
              todoProps.todo.ID,
              !todoProps.todo.Completed
            )
          }
        >
          {todoProps.todo.Title}
          {user?.picture ? (
            <img
              alt="user"
              style={{
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "block",
                float: "right",
                marginRight: 50,
              }}
              src={user.picture}
            />
          ) : null}
        </label>
        <button
          className="destroy"
          onClick={() => todoProps.handleDeleteChange(todoProps.todo)}
        ></button>
      </div>
    </li>
  );
};
