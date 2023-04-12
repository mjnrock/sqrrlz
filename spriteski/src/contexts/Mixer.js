import React from "react";
import { Mixer } from "./../lib/mixer/Mixer.js";

export const Context = React.createContext();

export const EnumAction = {
	SET_TRACKS: "SET_TRACKS",
	SWAP_FRAME_INDEX: "SWAP_FRAME_INDEX",
	SWAP_TRACK_INDEX: "SWAP_TRACK_INDEX",
};

export const State = () => ({
	mixer: new Mixer(),
});

export const reducer = (state, action) => {
	switch(action.type) {
		case EnumAction.SET_TRACKS:
			state.mixer.set(action.payload.tracks);

			return {
				...state,
			};
		case EnumAction.SWAP_FRAME_INDEX:
			state.mixer.tracks.forEach((track, i) => {
				if(track.id === action.payload.tid && action.payload.i1 !== action.payload.i2 && action.payload.i2 >= 0 && action.payload.i1 >= 0 && action.payload.i2 < track.frames.size && action.payload.i1 < track.frames.size) {
					track.swap(action.payload.i1, action.payload.i2);
				}
			});

			return {
				...state,
			};
		case EnumAction.SWAP_TRACK_INDEX:
			if(action.payload.i1 !== action.payload.i2 && action.payload.i2 >= 0 && action.payload.i1 >= 0 && action.payload.i2 < state.mixer.tracks.size && action.payload.i1 < state.mixer.tracks.size) {
				state.mixer.swap(action.payload.i1, action.payload.i2);
			}

			return {
				...state,
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