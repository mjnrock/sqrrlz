import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Default from "./routes/Default.jsx";
import Tessellator from "./routes/Tessellator.jsx";
import Mixer from "./routes/Mixer.jsx";

import { Context as TessellationContext, State as TessellationState, reducer as tessellationReducer } from "./contexts/Tessellation.js";
import { Context as MixerContext, State as MixerState, EnumAction as MixerEnumAction, reducer as mixerReducer } from "./contexts/Mixer.js";

export function App() {
	const [ mixerState, mixerDispatch ] = useReducer(mixerReducer, MixerState());
	const [ tessellationState, tessellationDispatch ] = useReducer(tessellationReducer, TessellationState());

	return (
		<MixerContext.Provider value={ [ mixerState, mixerDispatch ] }>
			<TessellationContext.Provider value={ [ tessellationState, tessellationDispatch ] }>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={ <Default /> } />
						<Route path="/tessellator" element={ <Tessellator /> } />
						<Route path="/mixer" element={ <Mixer /> } />
					</Routes>
				</BrowserRouter>
			</TessellationContext.Provider>
		</MixerContext.Provider>
	);
}

export default App;