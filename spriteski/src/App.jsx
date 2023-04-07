import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./routes/Default";
import Tessellator from "./routes/Tessellator";
import Mixer from "./routes/Mixer";

export const initState = {};
export const Context = React.createContext();

export function App() {
	return (
		<Context.Provider value={ initState }>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={ <Default /> } />
					<Route path="/tessellator" element={ <Tessellator /> } />
					<Route path="/mixer" element={ <Mixer /> } />
				</Routes>
			</BrowserRouter>
		</Context.Provider>
	);
}

export default App;