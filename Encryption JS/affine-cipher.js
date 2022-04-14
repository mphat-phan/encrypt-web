
import { filterMsg, undoMsg} from '../Encryption JS/commons/index.js';

const check = (a)=>{

    var flag = 0;
    for (var i = 0; i < 26; i++)
    {
        flag = (a * i) % 26;

        if (flag == 1)
        {
            return true;
        }
    }
    return false;
}
const encryptMessage = (msg,a,b) => {
    ///Cipher Text initially empty
    var cipher = "";
    for (let i = 0; i < msg.length; i++)
    {
        /* áp dụng công thức mã hóa (a x + b) mod m, 
        ở đây x là msg [i] và m là 26 và đã thêm 'A' vào mang nó 
        trong phạm vi bảng chữ cái ascii [65-90 | A-Z] */
        cipher += String.fromCharCode((((a * (msg[i].charCodeAt(0)-'A'.charCodeAt(0)) ) + b) % 26) + 'A'.charCodeAt(0));
    }
    return cipher;
}
 
const decryptCipher = (cipher,a,b) => {
    var msg = "";
    var a_inv = 0;
    var flag = 0;
     
    //Tìm a ^ -1 (nghịch đảo nhân của a
    // trong nhóm các số nguyên modulo m)
    for (var i = 0; i < 26; i++)
    {
        flag = (a * i) % 26;

    // Kiểm tra xem (a * i)% 26 == 1, 
    // thì tôi sẽ là nghịch đảo nhân của a
        if (flag == 1)
        {
            a_inv = i;
        }
    }
    for (let i = 0; i < cipher.length; i++)
    {
        /*
        Áp dụng phương pháp giải mã a ^ -1 (x - b) mod m
        {ở đây x là mật mã [i] và m là 26} và được thêm 'A'
        để đưa nó vào phạm vi bảng chữ cái ASCII [65-90 | A-Z] */
        msg += String.fromCharCode(((a_inv * ((cipher[i].charCodeAt(0)+'A'.charCodeAt(0) - b)) % 26)) + 'A'.charCodeAt(0));
    }
 
    return msg;
}
 
//Driver Program
const msg1 = "Minh Pkat";
const _decryptMsg =  encryptMessage(msg1, 5, 3);
console.log("Encrypted Message is: " + _decryptMsg);
console.log("Decrypted Message is: " + decryptCipher(_decryptMsg, 5, 3));
const msg = "An toan";
const _filterMsg = filterMsg(msg);
const _encryptMsg =  encryptMessage(_filterMsg, 5, 3);
const _undoEncryptMsg = undoMsg(_encryptMsg,msg);
console.log("Encrypted Message is: " + _undoEncryptMsg);

const _filterEncryptMsg = filterMsg(_undoEncryptMsg);
const _decryptMsg = decryptCipher(_filterEncryptMsg, 5, 3);
const _undoDecryptMsg = undoMsg(_decryptMsg,_undoEncryptMsg);
console.log("Decrypted Message is: " + _undoDecryptMsg);

