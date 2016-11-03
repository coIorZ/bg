import { SET_GAMEINFO_FOLDED } from '../actions';

const initialState = {
	folded: 1  // 0-folded  1-half  2-full
};

export default function(state = initialState, action) {
	switch(action.type) {
	case SET_GAMEINFO_FOLDED:
		return {...state, folded: action.payload};

	default:
		return state;
	}
};