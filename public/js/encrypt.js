import { encrypt as encryptHill, decrypt as decryptHill } from "../../Encryption JS/hill-cipher.js";
import { Decipher as decryptSubtitute, Encipher as encryptSubtitute} from "../../Encryption JS/subtitute-cipher.js";
import { undoMsg, filterMsg} from "../../Encryption JS/commons/index.js";
import { displayResult } from "./commons.js";
import * as constants from "../../Encryption JS/constants/index.js";
const encryptResult = document.querySelector('#encrypt-result');
const decryptResult = document.querySelector('#decrypt-result');

export const encryptPlaintext = (slug, msg, key) => {
    const filter = filterMsg(msg);
    let a;
    if(slug == 'hill-cipher'){
        a = encryptHill(filter,[...key]);
    }
    if(slug == 'subtitute-cipher'){
        a = encryptSubtitute(filter,key,constants.subAlphabet1);
    }
    const undo = undoMsg(a,msg);
    displayResult(undo,encryptResult);
    return undo;
}



export const decryptCyphertext = (slug, msg, key) => {
    const filter = filterMsg(msg);
    let a;
    if(slug == 'hill-cipher'){
        a = decryptHill(filter,[...key]);
    }
    if(slug == 'subtitute-cipher'){
        a = decryptSubtitute(filter,key,constants.subAlphabet1);
    }
    const undo = undoMsg(a,msg);
    displayResult(undo,decryptResult);
    return undo;
}