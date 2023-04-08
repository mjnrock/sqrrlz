import React from "react";

export const initState = {};
export const Context = React.createContext();

export const EnumAction = {
	SET_TILESET: "SET_TILESET",
	SET_TILESET_SIZE: "SET_TILESET_SIZE",
	SET_TILESET_DIRECTION: "SET_TILESET_DIRECTION",
};

export const reducer = (state, action) => {
	switch(action.type) {
		case EnumAction.SET_TILESET:
			return {
				...state,
				tileset: action.payload,
			};
		case EnumAction.SET_TILESET_SIZE:
			return {
				...state,
				tileSize: action.payload,
			};
		case EnumAction.SET_TILESET_DIRECTION:
			return {
				...state,
				tileDirection: action.payload,
			};
		default:
			return state;
	}
};