// C++ code to implement Vigenere Cipher
#include<bits/stdc++.h>
using namespace std;
 
//Hàm này tạo khóa tuần hoàn cho đến khi bằng chiều dài của độ dài văn bản
string generateKey(string str, string key)
{
    //Gán chiều dài của str vào x
    int x = str.size();
    
    for (int i = 0; ; i++)
    {
        //Nếu lặp lại khóa
        if (x == i)
            i = 0;
        //Nếu chiều dài key = size thì thoát vòng lặp
        if (key.size() == str.size())
            break;

        key.push_back(key[i]);
    }
    return key;
}
 
//Hàm chuyển plain text thành cipher text
string cipherText(string str, string key)
{
    string cipher_text = "";
    //Lặp theo độ dài plain text
    for (int i = 0; i < str.size(); i++)
    {
        //Chuyển char trong phạm vi từ 0-25
        cipher_text+=(char)((int)str[i]-'A' + (int)key[i]-'A') %26 + 'A';
    }
    return cipher_text;
}
 
//Hàm chuyển cipher text thành plain text
string originalText(string cipher_text, string key)
{
    string orig_text = "";
 //Lặp theo độ dài cipher text
    for (int i = 0 ; i < cipher_text.size(); i++)
    {
        orig_text+=(char)((int)cipher_text[i] - (int)key[i] + 26) %26 + 'A';
    }
    return orig_text;
}
 
// Driver program to test the above function
int main()
{

    string str = "PHANMINHPHAT";
    string keyword = "HELLO";

    //Tạo khóa theo chiều dài của str
    string key = generateKey(str, keyword);
    string cipher_text = cipherText(str, key);
 
    cout << "Ciphertext : "
         << cipher_text << "\n";
 
    cout << "Original/Decrypted Text : "
         << originalText(cipher_text, key);
    return 0;
}