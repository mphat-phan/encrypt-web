//Kiểm tra chữ in hoa
import { isUpper,filterMsg,undoMsg } from "./commons/index.js";
  
//Xử lý giải mã
export const decryptCipher = (msg, key) => {
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
export const encryptCipher = (msg, key) => {
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

     
