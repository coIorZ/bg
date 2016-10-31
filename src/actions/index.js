export const CLIENTHEIGHT_APP = 'clientHeight_app';

export function setClientHeight(height) {
	return {
		type: CLIENTHEIGHT_APP,
		payload: height
	}
}

