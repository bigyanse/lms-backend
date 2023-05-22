export const isEmailValid = (email: string): boolean => {
	const emailRegex = /^(?!\.)("?(?:[\w\-!$%&'*+/=?^`{}|~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(?:\.[\w\-!$%&'*+/=?^`{}|~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*"?)|(?!\.)"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?!\.)((?:[a-zA-Z0-9](?:[\w\-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}|(?:(?:\d{1,3}\.){3}\d{1,3}))(?:\:\d{1,5})?$/;
	return emailRegex.test(email);
};

export const isPasswordValid = (password: string): boolean => {
	if (password.length < 6) {
		return false
	}
	return true;
};
