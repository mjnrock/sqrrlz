import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./routes/Default";
import Tessellator from "./routes/Tessellator";
import Mixer from "./routes/Mixer";

export const initState = {};
export const Context = React.createContext();

export const EnumAction = {
	SET_TILESET: "SET_TILESET",
	SET_TILESET_SIZE: "SET_TILESET_SIZE",
	SET_TILESET_DIRECTION: "SET_TILESET_DIRECTION",
};

export function App() {
	const [ state, dispatch ] = useReducer((state, action) => {
		switch(action.type) {
			case EnumAction.SET_TILESET:
				return {
					...state,
					...action.payload,
				};
			case EnumAction.SET_TILESET_SIZE:
				return {
					...state,
					size: action.payload,
				};
			case EnumAction.SET_TILESET_DIRECTION:
				return {
					...state,
					isRowXCol: action.payload,
				};
			default:
				return state;
		}
	}, initState);

	return (
		<Context.Provider value={ [ state, dispatch ] }>
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