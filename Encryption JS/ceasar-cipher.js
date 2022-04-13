//Kiểm tra chữ in hoa
import { isUpper,filterMsg,undoMsg } from "./commons/index.js";
  
//Xử lý giải mã
const decryptCipher = (msg, key) => {
    var decipher = "";
  
    //Giải mã từng ký tự
    for (var i = 0; i < msg.length; i++) {
        //Nếu là chữ in hoa
        if (isUpper(msg[i])) {
        decipher += String.fromCharCode(
            ((msg.charCodeAt(i) - key - 65) % 26) + 65
        );
        } else {
        //Còn là chữ thường thì ....
        decipher += String.fromCharCode(
            ((msg.charCodeAt(i) - key - 97) % 26) + 97
        );
        }
    }
    return decipher;
};

//Xử lý mã hóa
const encryptCipher = (msg, key) => {
    var encipher = "";
    
    //Mã hóa từng ký tự
    for (var i = 0; i < msg.length; i++) {
        //Nếu là chữ in hoa
        if (isUpper(msg[i])) {
            encipher += String.fromCharCode(
            ((msg.charCodeAt(i) + key - 65) % 26) + 65
          );
        } else {
          //Còn là chữ thường thì ....
            encipher += String.fromCharCode(
            ((msg.charCodeAt(i) + key - 97) % 26) + 97
          );
        }
      }
  
    return encipher;
}
const msgnew = "HELLO moi nguoi";

const _filterMsg = filterMsg(msgnew);

const cipherText = encryptCipher(_filterMsg, 3); 

console.log("Encryted Message is: ");
const undoCipher = undoMsg(cipherText,msgnew); 
console.log(undoCipher);

console.log("Decryted Message is: ");
const _filterCipherMsg = filterMsg(undoCipher);
const plainText = decryptCipher(_filterCipherMsg, 3);
const undoPlain = undoMsg(plainText,undoCipher);
console.log(undoPlain);


     
