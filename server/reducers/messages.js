const initialState = [];
const MAXIMUM = 50;

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case 'NEW_MESSAGE':
		let messages = [...state, payload];
		if(messages.length > MAXIMUM) {
			messages.splice(0, messages.length - MAXIMUM);
		}
		return messages;

	default:
		return state;
	}
}