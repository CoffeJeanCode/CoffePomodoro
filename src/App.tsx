import { MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import { Route, Router } from "wouter";

import Home from "./pages/Home";
import Widget from "./pages/Widget";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <RecoilRoot>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/widget" component={Widget} />
        </Router>
      </RecoilRoot>
    </MantineProvider>
  );
}

export default App;
