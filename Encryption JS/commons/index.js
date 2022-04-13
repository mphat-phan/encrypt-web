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

//Find space index of message
export const spaceIndexs = (_message) => {
    const spaceIndex = [];
    let index = 0;
    for(let i = 0; i < _message.length; i++){
        
        if(_message[i] == ' ' || _message[i] == '\t' || _message[i] == '\n'){
            spaceIndex.push(i - index);
            index++;
        } 
    }

    return spaceIndex;
}

//Find lower index of message
export const lowerIndexs = (_message) => {
    const lowerIndex = [];
    let index = 0;
    for(let i = 0; i < _message.length; i++){
        
        if(isLower(_message[i])){
            lowerIndex.push(i);
            index++;
        } 
    }

    return lowerIndex;
}

//Remove space message fn 
export const removeSpaceMsg = (_message) => {
    _message = _message.replace(/\s+/g, '');
    return _message;
}

//Undo root message
export const undoMsg = (msg, oldMsg) => {
    const root = []; 
    let indexSpace = 0;
    let indexLower = 0;
    const space = spaceIndexs(oldMsg);
    const lower = lowerIndexs(oldMsg);
    //Add space to msg
    for(let i=0; i<oldMsg.length; i++){
        if(i == space[indexSpace]){
            root.push(' ');
            root.push(msg[i]);
            indexSpace++;
            continue;
        }
        else{
            root.push(msg[i]);
        }
    }
    //Lower msg
    for(let i=0; i<oldMsg.length; i++){
        if(i == lower[indexLower] && isUpper(root[i])){
            root[i] = lowerStr(root[i]);
            indexLower++;
        }
    }
    return root.join('');
}

//Convert root msg to filter msg function
export const filterMsg = (_message) => {
    let msg = upperStr(_message);
    msg = removeSpaceMsg(msg);
    return msg;
}