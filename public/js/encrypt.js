import { encrypt as encryptHill, decrypt as decryptHill } from "../../Encryption JS/hill-cipher.js";
import { Decipher as decryptSubtitute, Encipher as encryptSubtitute} from "../../Encryption JS/subtitute-cipher.js";
import { encryptMessage as encryptAffine, decryptCipher as decryptAffine } from "../../Encryption JS/affine-cipher.js";
import { encode as encryptVigenere, decode as decryptVigenere} from "../../Encryption JS/vigenere-cipher.js";
import { encryptCipher as encryptCeasar, decryptCipher as decryptCeasar } from "../../Encryption JS/ceasar-cipher.js";
import { undoMsg, filterMsg} from "../../Encryption JS/commons/index.js";
import { displayResult } from "./commons.js";
import { upperStr,lowerStr } from "../../Encryption JS/commons/index.js";
import * as constants from "../../Encryption JS/constants/index.js";
const encryptResult = document.querySelector('#encrypt-result');
const decryptResult = document.querySelector('#decrypt-result');

export const encryptPlaintext = (slug, msg, key) => {
    const filter = filterMsg(msg);
    let a;
    if(slug == 'hill-cipher'){
        a = encryptHill(filter,[...key]);
    }
    if(slug == 'affine-cipher'){
        a= encryptAffine(filter,parseInt(key[0]),parseInt(key[1]));
    }
    if(slug == 'subtitute-cipher'){
        key = lowerStr(key);
        a = encryptSubtitute(filter,key,constants.subAlphabet1);
    }
    if(slug == 'vigenere-cipher'){
        a = encryptVigenere(key,filter)
        
    }
    if(slug == 'ceasar-cipher'){
        a = encryptCeasar(filter,parseInt(key));
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
    if(slug == 'affine-cipher'){
        a= decryptAffine(filter,parseInt(key[0]),parseInt(key[1]));
    }
    if(slug == 'subtitute-cipher'){
        key = lowerStr(key);
        a = decryptSubtitute(filter,key,constants.subAlphabet1);
    }
    if(slug == 'vigenere-cipher'){
        a = decryptVigenere(key,filter);
    }
    if(slug == 'ceasar-cipher'){
        a = decryptCeasar(filter,parseInt(key));
    }
    const undo = undoMsg(a,msg);
    displayResult(undo,decryptResult);
    return undo;
}