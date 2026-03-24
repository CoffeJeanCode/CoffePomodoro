import { Center, Loader, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));

const App = () => {
	return (
		<MantineProvider defaultColorScheme="dark" withCssVariables>
			<Suspense
				fallback={
					<Center h="100vh">
						<Loader color="red" size="xl" />
					</Center>
				}
			>
				<Home />
			</Suspense>
		</MantineProvider>
	);
};

export default App;
