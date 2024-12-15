import { renderHook, act } from "@testing-library/react";
import { useToDos } from "./useToDos";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid"),
}));

describe("useToDos hook", () => {
  it("Initialized with empty toDosStore", () => {
    const { result } = renderHook(() => useToDos());
    expect(result.current.toDosStore).toEqual({ input: "", toDos: {} });
  });

  it("We update the input when it changes", () => {
    const { result } = renderHook(() => useToDos());
    act(() => {
      result.current.changeInput("New task");
    });
    expect(result.current.toDosStore.input).toBe("New task");
  });

  it("When calling addTodo, a new element is added to toDos and the contents of input are reset", () => {
    const { result } = renderHook(() => useToDos());

    act(() => {
      result.current.toDosStore.input = "New task";
      result.current.addToDo();
    });
    expect(result.current.toDosStore.toDos).toEqual({
      "mocked-uuid": { checked: false, content: "New task" },
    });
    expect(result.current.toDosStore.input).toBe("");
  });

  it("When removeCompleted is called, completed tasks are deleted", () => {
    const { result } = renderHook(() => useToDos());
    act(() => {
      result.current.toDosStore.toDos = {
        "id-1": { checked: false, content: "Task one" },
        "id-2": { checked: true, content: "Task two" },
      };
      result.current.removeCompleted();
    });
    expect(result.current.toDosStore.toDos).toEqual({
      "id-1": { checked: false, content: "Task one" },
    });
  });

  it("When toggleChecked is called, the task state is reversed", () => {
    const { result } = renderHook(() => useToDos());
    act(() => {
      result.current.toDosStore.toDos = {
        "id-1": { checked: false, content: "Task one" },
        "id-2": { checked: true, content: "Task two" },
      };
      result.current.toggleChecked("id-1");
      result.current.toggleChecked("id-2");
    });
    expect(result.current.toDosStore.toDos).toEqual({
      "id-1": { checked: true, content: "Task one" },
      "id-2": { checked: false, content: "Task two" },
    });
  });
});
