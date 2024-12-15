import { Box, Group, Text, UnstyledButton } from "@mantine/core";
import { Filter } from "src/04_entities/filter";
import classes from "./style.module.css";

interface DashboardProps {
  counterData: {
    value: number;
    status: string;
  };
  data: string[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  removeCompleted: () => void;
}
export function Dashboard({
  counterData,
  data,
  active,
  setActive,
  removeCompleted,
}: DashboardProps) {
  const counterText = getCounterText(counterData.value, counterData.status);

  return (
    <>
      <Box className={classes["dashboard-wrapper"]}>
        <Group justify="space-between">
          <Text className={classes["counter"]}>{counterText}</Text>
          <Filter data={data} active={active} setActive={setActive} />
          <UnstyledButton
            onClick={removeCompleted}
            className={classes["clear-button"]}
          >
            Clear completed
          </UnstyledButton>
        </Group>
      </Box>
    </>
  );
}

function getCounterText(value: number, status: string): string {
  const plural = value === 1 ? "item" : "items";
  if (status === "Completed") {
    return value === 0 ? "No completed items" : `${value} completed ${plural}`;
  }
  return value === 0 ? "No active items" : `${value} ${plural} left`;
}
