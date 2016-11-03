import { SET_GAMEINFO_FOLDED } from '../actions';

const initialState = {
	folded: 1
};

export default function(state = initialState, action) {
	switch(action.type) {
	case SET_GAMEINFO_FOLDED:
		return {...state, folded: action.payload};

	default:
		return state;
	}
};