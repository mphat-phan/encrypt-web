//CPP program to illustrate Affine Cipher
 
#include<iostream>
using namespace std;

string Cipher(string input, string oldAlphabet, string newAlphabet)
{
	string output = "";
	int inputLen = input.size();
	//Kiểm tra độ dài giữa plainAlphabet và cipherAlphabet
	if (oldAlphabet.size() != newAlphabet.size())
		return "Sai";

	//Lặp n ký tự inputLen
	for (int i = 0; i < inputLen; ++i)
	{
		int oldCharIndex = oldAlphabet.find(tolower(input[i]));
		//Nếu tìm thấy ký tự trong oldAlphabet
		if (oldCharIndex >= 0)
			//Nếu tại vị trí thứ i là in hoa thì trả về bản chữ cái thay thế thứ i in hóa,
			//ngược lại thì trả về in thường
			output += isupper(input[i]) ? toupper(newAlphabet[oldCharIndex]) : newAlphabet[oldCharIndex];
		//Nếu không tìm thấy ký tự như là khoảng trắng thì trả về khoảng trắng hoặc các ký tự ngoài alphabet
		else
			output += input[i];
	}

	return output;
}
//Hàm mã hóa plain text
string Encipher(string input, string cipherAlphabet, string plainAlphabet)
{
	//Từ mã plainAlphabet thay thế thành cipherAlphabet => Encipher
	return Cipher(input, plainAlphabet, cipherAlphabet);
}
//Hàm giải mã cipher text
string Decipher(string input, string cipherAlphabet, string plainAlphabet)
{
	//Từ mã cipherAlphabet thay thế thành plainAlphabet => Decipher
	return Cipher(input, cipherAlphabet, plainAlphabet);
}

int main(){
	//Bảng chữ cái Alphabet
    string plainAlphabet = "abcdefghijklmnopqrstuvwxyz";
	//Bảng chữ cái thay thế Alphabet
    string cipherAlphabet= "xnyahpogzqwbtsflrcvmuekjdi";
	//Plain text
    string plainText = "ghenvoicovid";
    
    string cipherText = Encipher(plainText, cipherAlphabet, plainAlphabet);
    cout << cipherText << endl;
	cout << Decipher(cipherText, cipherAlphabet, plainAlphabet) << endl;
}
