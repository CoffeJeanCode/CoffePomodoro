import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { Router, Route } from "wouter";

import Home from "./pages/Home";
import Widget from "./pages/Widget";

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/widget" component={Widget} />
        </Router>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
