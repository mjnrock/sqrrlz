import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Default from "./routes/Default";
import Tessellator from "./routes/Tessellator";
import Mixer from "./routes/Mixer";

import { Context as TessellationContext, State, reducer } from "./contexts/Tessellation";

export function App() {
	const [ state, dispatch ] = useReducer(reducer, State());

	return (
		<TessellationContext.Provider value={ [ state, dispatch ] }>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={ <Default /> } />
					<Route path="/tessellator" element={ <Tessellator /> } />
					<Route path="/mixer" element={ <Mixer /> } />
				</Routes>
			</BrowserRouter>
		</TessellationContext.Provider>
	);
}

export default App;