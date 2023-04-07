import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./routes/Default";
import Tessellator from "./routes/Tessellator";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={ <Default /> } />
				<Route path="/tessellator" element={ <Tessellator /> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;