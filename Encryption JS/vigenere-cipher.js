import { filterMsg,undoMsg } from "./commons/index.js";
const encode = (k, s) => {
    k = k.toUpperCase();
    s = s.toUpperCase();
    var r = "";
    var c = 0;
    for(var i = 0;i<s.length;i++){
        if(s[i].charCodeAt(0)<"A".charCodeAt(0)||s[i].charCodeAt(0)>"Z".charCodeAt(0)){
            r+=s[i];
            continue;
        }
        r+=String.fromCharCode((s[i].charCodeAt(0)+k[c].charCodeAt(0)-(2*"A".charCodeAt(0)))%26+"A".charCodeAt(0));
        c = (c+1)%k.length;
    }
    return r;
  }
const decode = (k, s) => {
    k = k.toUpperCase();
    s = s.toUpperCase();
    var r = "";
    var c = 0;
    for(var i = 0;i<s.length;i++){
        if(s[i].charCodeAt(0)<"A".charCodeAt(0)||s[i].charCodeAt(0)>"Z".charCodeAt(0)){
            r+=s[i];
            continue;
        }
        r+=String.fromCharCode((s[i].charCodeAt(0)-k[c].charCodeAt(0)+26)%26+"A".charCodeAt(0));
        c = (c+1)%k.length;
    }
    return r;
}
const message = "Phan Minh Phat";
const key = "hello";

const _filterMsg = filterMsg(message);
const cipherMsg = encode(key,_filterMsg);
const undoCipher = undoMsg(cipherMsg,message);
console.log(undoCipher);

const _filterCipher = filterMsg(undoCipher);
const plainMsg = decode(key,_filterCipher);
const undoPlain = undoMsg(plainMsg,undoCipher);
console.log(undoPlain);