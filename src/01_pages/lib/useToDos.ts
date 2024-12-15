import { useState } from "react";
import { toDosType } from "src/04_entities/todos/types";
import { v4 as uuidv4 } from "uuid";

export function useToDos() {
  const [toDos, setToDos] = useState<Record<string, toDosType>>({});
  const [input, setInput] = useState("");

  const addToDo = () => {
    const id = uuidv4();
    setToDos((prev) => ({ ...prev, [id]: { checked: false, content: input } }));
    setInput("");
  };

  const removeCompleted = () => {
    setToDos((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([_, v]) => !v.checked))
    );
  };

  return { toDos, setToDos, input, setInput, addToDo, removeCompleted };
}
