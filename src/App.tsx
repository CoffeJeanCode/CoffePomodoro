import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { Route } from "wouter";

import Home from "./pages/Home";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <RecoilRoot>
        <Route path="/" component={Home} />
      </RecoilRoot>
    </MantineProvider>
  );
}

export default App;
