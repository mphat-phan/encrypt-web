export const isLower = (str) => {
    return /[a-z]/.test(str) && !/[A-Z]/.test(str);
}

export const isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

//Convert Upper string function
export const upperStr = (_message) => {
    return _message.toUpperCase();
}

//Convert lower string function
export const lowerStr = (_message) => {
    return _message.toLowerCase();
}

export const mod26 = (x) => {
    return x >= 0 ? (x%26) : 26-(Math.abs(x)%26) ;
}

export const findIndexAlphabet = (str,alphabet) => {
	for(let i=0; i<alphabet.length; i++){
		if(str == alphabet[i]){
			return i;
		}
	}
}