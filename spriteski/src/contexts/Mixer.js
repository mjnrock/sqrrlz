import React from "react";

export const Context = React.createContext();

export const EnumAction = {
	SWAP_INDEX: "SWAP_INDEX",
};

export const State = () => ({
	tracks: [],
});

export const reducer = (state, action) => {
	switch(action.type) {
		case EnumAction.SWAP_INDEX:
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