import { Checkbox, Group, Text } from "@mantine/core";
import { toDosType } from "../types";
import classes from "./style.module.css";

interface ToDoItemProps {
  id: string;
  checked: boolean;
  content: string;
  setToDos: React.Dispatch<React.SetStateAction<Record<string, toDosType>>>;
}
export function ToDoItem({ id, checked, content, setToDos }: ToDoItemProps) {
  function handleCheck() {
    setToDos((value) => {
      return { ...value, [id]: { checked: !checked, content } };
    });
  }
  return (
    <>
      <li className={classes["list-item"]}>
        <Checkbox.Card checked={checked} onClick={handleCheck} className={classes["checkbox-card"]} >
          <Group>
            <Checkbox.Indicator radius={"lg"} />
            <Text className={checked ? classes["text_checked"] : ""}>
              {content}
            </Text>
          </Group>
        </Checkbox.Card>
      </li>
    </>
  );
}
