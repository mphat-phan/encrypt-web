function Cipher( input,  oldAlphabet,  newAlphabet)
{
	var output = "";
	var inputLen = input.size();
	//Kiểm tra độ dài giữa plainAlphabet và cipherAlphabet
	if (oldAlphabet.size != newAlphabet.size)
		return "Sai";

	//Lặp n ký tự inputLen
	for (var i = 0; i < inputLen; ++i)
	{
		var oldCharIndex = oldAlphabet.find(tolower(input[i]));
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
function Encipher( input,  cipherAlphabet,  plainAlphabet)
{
	//Từ mã plainAlphabet thay thế thành cipherAlphabet => Encipher
	return Cipher(input, plainAlphabet, cipherAlphabet);
}
//Hàm giải mã cipher text
function Decipher( input,  cipherAlphabet,  plainAlphabet)
{
	//Từ mã cipherAlphabet thay thế thành plainAlphabet => Decipher
	return Cipher(input, cipherAlphabet, plainAlphabet);
}


	//Bảng chữ cái Alphabet
    var plainAlphabet = "abcdefghijklmnopqrstuvwxyz";
	//Bảng chữ cái thay thế Alphabet
    var cipherAlphabet= "xnyahpogzqwbtsflrcvmuekjdi";
	//Plain text
    var plainText = "ghenvoicovid";
    
    var cipherText = Encipher(plainText, cipherAlphabet, plainAlphabet);
    cout << cipherText << endl;
	cout << Decipher(cipherText, cipherAlphabet, plainAlphabet) << endl;
