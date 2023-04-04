import { BrowserRouter, Switch, Route } from "react-router-dom";
import Default from "./routes/Default";

export function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Default />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;