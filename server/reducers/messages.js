const initialState = [];
const MAXIMUM = 20;

export default function(state = initialState, { type, payload }) {
	switch(type) {
	case 'NEW_MESSAGE':
		let messages = [...state, payload];
		if(messages.length > 20) {
			messages.splice(0, messages.length - 20);
		}
		return messages;

	default:
		return state;
	}
}