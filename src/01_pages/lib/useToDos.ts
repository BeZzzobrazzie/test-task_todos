import { useReducer } from "react";
import { toDosType } from "src/04_entities/todos/types";
import { v4 as uuidv4 } from "uuid";

type reducerState = {
  input: string;
  toDos: Record<string, toDosType>;
};
const reducer = (
  prevState: reducerState,
  action: { type: string; id?: string; inputContent?: string }
): reducerState => {
  if (action.type === "addToDo") {
    const newId = uuidv4();

    return {
      ...prevState,
      input: "",
      toDos: {
        ...prevState.toDos,
        [newId]: { checked: false, content: prevState.input },
      },
    };
  }
  if (action.type === "toggleChecked" && action.id) {
    return {
      ...prevState,
      toDos: {
        ...prevState.toDos,
        [action.id]: {
          ...prevState.toDos[action.id],
          checked: !prevState.toDos[action.id].checked,
        },
      },
    };
  }
  if (action.type === "removeCompleted") {
    const newToDos = Object.fromEntries(
      Object.entries(prevState.toDos).filter(([_, v]) => !v.checked)
    );
    return {
      ...prevState,
      toDos: newToDos,
    };
  }
  if (action.type === "changeInput" && action.inputContent) {
    return {
      ...prevState,
      input: action.inputContent,
    };
  }
  return prevState;
};

export function useToDos() {
  const [toDosStore, dispatch] = useReducer(reducer, { input: "", toDos: {} });

  const addToDo = () => {
    dispatch({ type: "addToDo" });
  };
  const removeCompleted = () => {
    dispatch({ type: "removeCompleted" });
  };
  const toggleChecked = (id: string) => {
    dispatch({ type: "toggleChecked", id });
  };
  const changeInput = (inputContent: string) => {
    dispatch({ type: "changeInput", inputContent });
  };

  return { toDosStore, addToDo, removeCompleted, toggleChecked, changeInput };
}
