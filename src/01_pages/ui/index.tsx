import { Box, Container, Stack, TextInput, Title } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { Dashboard } from "src/02_widgets";
import { ToDoItem } from "src/04_entities/todos";
import { useToDos } from "../lib/useToDos";
import classes from "./style.module.css";
import { ToggleColorScheme } from "src/03_features/toggle-color-scheme";

export function MainPage() {
  const { toDos, setToDos, input, setInput, addToDo, removeCompleted } =
    useToDos();

  const [activeFilterOption, setActiveFilterOption] = useState(0);
  const filterOptions = ["All", "Active", "Completed"];

  const filteredToDoIds = Object.keys(toDos).filter((id) => {
    if (filterOptions[activeFilterOption] === "Active")
      return !toDos[id].checked;
    if (filterOptions[activeFilterOption] === "Completed")
      return toDos[id].checked;
    return true;
  });

  const listContent = filteredToDoIds.map((id) => (
    <ToDoItem
      key={id}
      id={id}
      checked={toDos[id].checked}
      content={toDos[id].content}
      setToDos={setToDos}
    />
  ));

  return (
    <>
      <ToggleColorScheme />
      <Container className={classes["container"]}>
        <Stack justify="center">
          <Title order={1} size="5rem" className={classes["title"]}>
            todos
          </Title>
          <Box className={classes["todo__wrapper"]}>
            <Box className={classes["todo"]}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToDo();
                }}
              >
                <TextInput
                  leftSection={<IconChevronDown />}
                  placeholder="What needs to be done?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  size="lg"
                  className={
                    input === ""
                      ? classes["input_empty"]
                      : classes["input_full"]
                  }
                />
              </form>

              <ul className={classes["list"]}>{listContent}</ul>
              <Dashboard
                counterData={{
                  value: filteredToDoIds.length,
                  status: filterOptions[activeFilterOption],
                }}
                data={filterOptions}
                active={activeFilterOption}
                setActive={setActiveFilterOption}
                removeCompleted={removeCompleted}
              />
            </Box>
            <Box className={classes["rungs"]} />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
