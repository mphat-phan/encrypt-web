import { encrypt as encryptHill, decrypt as decryptHill } from "../../Encryption JS/hill-cipher.js";
import { undoMsg, filterMsg} from "../../Encryption JS/commons/index.js";
import { displayResult } from "./commons.js";
const encryptResult = document.querySelector('#encrypt-result');
const decryptResult = document.querySelector('#decrypt-result');

export const encryptPlaintext = (slug, msg, key) => {
    const filter = filterMsg(msg);
    let a;
    if(slug == 'hill-cipher'){
        a = encryptHill(filter,[...key]);
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

    const undo = undoMsg(a,msg);
    displayResult(undo,decryptResult);
    return undo;
}