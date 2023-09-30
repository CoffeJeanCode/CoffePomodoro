import { Center, Loader, MantineProvider } from "@mantine/core";
import { Suspense, lazy } from "react";
import { Route } from "wouter";

const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <Suspense
        fallback={
          <Center h="100vh">
            <Loader color="red" size="xl" />
          </Center>
        }
      >
        <Route path="/" component={Home} />
      </Suspense>
    </MantineProvider>
  );
};

export default App;
