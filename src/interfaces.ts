export interface ITodo {
  ID: string;
  Title: string;
  Completed: boolean;
  OwnerID: string;
}
export interface IUser {
  id: string;
  email: string;
  picture: string;
  name: string;
}

export interface ITodoService {
  listTodos: () => Promise<ITodo[]>;
  saveTodo: (todo: ITodo, isUpdate?: boolean) => Promise<ITodo[]>;
  deleteTodo: (todo: ITodo) => Promise<void | Response>;
  getUser: (sub: string) => Promise<IUser>;
}

export interface ITodoProps {
  todo: ITodo;
  handleCompletedChange: (todoId: string, completed: boolean) => void;
  handleDeleteChange: (Todo: ITodo) => void;
}

export interface ITodosProps {
  todos: ITodo[] | void;
  showCompleted: boolean;
  showActive: boolean;
  refreshTodos: () => void;
  errorHandler(errorText: string): void;
}

export interface IAppProps {
  user: IAuthUser;
}

export interface IAuthUser {
  email: string;
  sub: string;
}
