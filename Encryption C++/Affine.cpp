//CPP program to illustrate Affine Cipher
 
#include<bits/stdc++.h>
using namespace std;

 
string encryptMessage(string msg, int a, int b)
{
    ///Cipher Text initially empty
    string cipher = "";
    for (int i = 0; i < msg.length(); i++)
    {
        // Avoid space to be encrypted
        if(msg[i]!=' ')
            /* áp dụng công thức mã hóa (a x + b) mod m, 
            ở đây x là msg [i] và m là 26 và đã thêm 'A' vào mang nó 
            trong phạm vi bảng chữ cái ascii [65-90 | A-Z] */
            cipher += isupper(msg[i]) ? (char) ((((a * (msg[i]-'A') ) + b) % 26) + 'A') : (char) ((((a * (msg[i]-'a') ) + b) % 26) + 'a');
        else
            //else simply append space character
            cipher += msg[i];    
    }
    return cipher;
}
 
string decryptCipher(string cipher, int a, int b)
{
    string msg = "";
    int a_inv = 0;
    int flag = 0;
     
    //Tìm a ^ -1 (nghịch đảo nhân của a
    // trong nhóm các số nguyên modulo m)
    for (int i = 0; i < 26; i++)
    {
        flag = (a * i) % 26;

    // Kiểm tra xem (a * i)% 26 == 1,
    // thì tôi sẽ là nghịch đảo nhân của a
        if (flag == 1)
        {
            a_inv = i;
        }
    }
    for (int i = 0; i < cipher.length(); i++)
    {
        if(cipher[i]!=' ')
            /*
            Áp dụng phương pháp giải mã a ^ -1 (x - b) mod m
            {ở đây x là mật mã [i] và m là 26} và được thêm 'A'
            để đưa nó vào phạm vi bảng chữ cái ASCII [65-90 | A-Z] */
            msg += isupper(cipher[i]) ? (char) (((a_inv * ((cipher[i]+'A' - b)) % 26)) + 'A') : (char) (((a_inv * ((cipher[i]-'a' - b)) % 26)) + 'a');
        else
            //Nếu là ký tự là khoảng trắng
            msg += cipher[i];
    }
 
    return msg;
}
 
//Driver Program
int main(void)
{
    string msg1 = "ibt nct nkt";
     
    //VD 1
    //string cipherText1 = encryptMessage(msg1, 5, 6);
    //cout << "Encrypted Message1 is : " << cipherText1<<endl;
    cout << "Decrypted Message1 is: " << decryptCipher(msg1, 4, 2)<<endl;
    
    //string msg2 = "ibt nct nkt";
     
    //VD 2
    // string cipherText2 = encryptMessage(msg2, 5, 3);
    // cout << "Encrypted Message2 is : " << cipherText2<<endl;
    // cout << "Decrypted Message2 is: " << decryptCipher(cipherText2, 5, 3)<<endl;

    return 0;
}