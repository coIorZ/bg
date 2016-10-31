import { CLIENTHEIGHT_APP } from '../actions';

const initialState = {
	clientHeight: document.documentElement.clientHeight
};

export default function(state = initialState, action) {
	switch(action.type) {
	case CLIENTHEIGHT_APP:
		return {...state, clientHeight: action.payload};
	default:
		return state;
	}
};