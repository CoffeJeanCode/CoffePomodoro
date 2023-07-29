import { MantineProvider } from "@mantine/core";
import { Route } from "wouter";

import Home from "./pages/Home";

const App = () => {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <Route path="/" component={Home} />
    </MantineProvider>
  );
};

export default App;
