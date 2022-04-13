//Kiểm tra chữ in hoa
var isUpperCase = (msg) => {
    return msg === msg.toUpperCase();
};
  
//Xử lý giải mã
function decryptCipher (msg, key) {
    var decipher = "";
  
    //Giải mã từng ký tự
    for (var i = 0; i < msg.length; i++) {
        //Nếu là chữ in hoa
        if (isUpperCase(msg[i])) {
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
function encryptCipher(msg, key) {
    var encipher = "";
    
    //Mã hóa từng ký tự
    for (var i = 0; i < msg.length; i++) {
        //Nếu là chữ in hoa
        if (isUpperCase(msg[i])) {
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
var msgnew = "MKQTVMAD";
const cipherText = encryptCipher(msgnew,3);
console.log("Encryted Message is: " + cipherText);
console.log("Decrypted Message is: "+ decryptCipher(cipherText,3)); 

     
