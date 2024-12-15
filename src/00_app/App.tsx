import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { MainPage } from "src/01_pages";
import { theme } from "./theme";

function App() {

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <MainPage />
      </MantineProvider>
    </>
  );
}

export default App;
