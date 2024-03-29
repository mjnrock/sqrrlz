import React from "react";

export const Context = React.createContext();

export const EnumAction = {
	TESSELLATE: "TESSELLATE",
};

export const State = () => ({
	tileset: null,
	image: null,
	isRowXCol: true,
	tileWidth: 32,
	tileHeight: 32,
});

export const reducer = (state, action) => {
	switch(action.type) {
		case EnumAction.TESSELLATE:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default {
	State,
	Context,
	EnumAction,
	reducer,
};