
const isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}
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
        // Avoid space to be encrypted
        if(msg[i]!=' ')
            /* áp dụng công thức mã hóa (a x + b) mod m, 
            ở đây x là msg [i] và m là 26 và đã thêm 'A' vào mang nó 
            trong phạm vi bảng chữ cái ascii [65-90 | A-Z] */
            cipher += isUpper(msg[i]) ? String.fromCharCode((((a * (msg[i].charCodeAt(0)-'A'.charCodeAt(0)) ) + b) % 26) + 'A'.charCodeAt(0)) : String.fromCharCode((((a * (msg[i].charCodeAt(0)-'a'.charCodeAt(0)) ) + b) % 26) + 'a'.charCodeAt(0));
        else
            //else simply append space character
            cipher += msg[i];    
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
        if(cipher[i]!=' ')
            /*
            Áp dụng phương pháp giải mã a ^ -1 (x - b) mod m
            {ở đây x là mật mã [i] và m là 26} và được thêm 'A'
            để đưa nó vào phạm vi bảng chữ cái ASCII [65-90 | A-Z] */
            msg += isUpper(cipher[i]) ? String.fromCharCode(((a_inv * ((cipher[i].charCodeAt(0)+'A'.charCodeAt(0) - b)) % 26)) + 'A'.charCodeAt(0)) : String.fromCharCode(((a_inv * ((cipher[i].charCodeAt(0)-'a'.charCodeAt(0) - b)) % 26)) + 'a'.charCodeAt(0));
        else
            //Nếu là ký tự là khoảng trắng
            msg += cipher[i];
    }
 
    return msg;
}
 
//Driver Program
const msg1 = "ibt nct nkt";
const _decryptMsg =  encryptMessage(msg1, 4, 2);
console.log("Encrypted Message is: " + _decryptMsg);
console.log("Decrypted Message is: " + decryptCipher(_decryptMsg, 4, 2));
