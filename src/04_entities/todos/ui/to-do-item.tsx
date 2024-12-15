import { Checkbox, Group, Text } from "@mantine/core";
import classes from "./style.module.css";

interface ToDoItemProps {
  id: string;
  checked: boolean;
  content: string;
  toggleChecked: (id: string) => void;
}
export function ToDoItem({
  id,
  checked,
  content,
  toggleChecked,
}: ToDoItemProps) {
  return (
    <>
      <li className={classes["list-item"]}>
        <Checkbox.Card
          checked={checked}
          onClick={() => toggleChecked(id)}
          className={classes["checkbox-card"]}
        >
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
