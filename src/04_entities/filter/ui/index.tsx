import {
  FloatingIndicator,
  UnstyledButton,
  useComputedColorScheme
} from "@mantine/core";
import { useState } from "react";
import classes from "./style.module.css";

interface FilterProps {
  data: string[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}
export function Filter({ data, active, setActive }: FilterProps) {
  const computedColorScheme = useComputedColorScheme();
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item}
      className={classes.control}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={[
        { active: active === index },
        { "color-scheme": computedColorScheme },
      ]}
    >
      <span className={classes.controlLabel}>{item}</span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}
