const isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}
const findIndexAlphabet = (str,alphabet) => {
	for(let i=0; i<alphabet.length; i++){
		if(str == alphabet[i]){
			return i;
		}
	}
}
function Cipher(input,  oldAlphabet,  newAlphabet)
{
	var output = "";
	var inputLen = input.length;

	//Lặp n ký tự inputLen
	for (var i = 0; i < inputLen; ++i)
	{
		var oldCharIndex = findIndexAlphabet(input[i].toLowerCase(), oldAlphabet);
		//Nếu tìm thấy ký tự trong oldAlphabet
		if (oldCharIndex >= 0)
			//Nếu tại vị trí thứ i là in hoa thì trả về bản chữ cái thay thế thứ i in hóa,
			//ngược lại thì trả về in thường
			output += isUpper(input[i]) ? newAlphabet[oldCharIndex].toUpperCase() : newAlphabet[oldCharIndex];
		//Nếu không tìm thấy ký tự như là khoảng trắng thì trả về khoảng trắng hoặc các ký tự ngoài alphabet
		else
			output += input[i];
	}

	return output;
}
//Hàm mã hóa plain text
function Encipher(input,  _cipherAlphabet,  _plainAlphabet)
{
	//Từ mã plainAlphabet thay thế thành cipherAlphabet => Encipher
	return Cipher(input, plainAlphabet, cipherAlphabet);
}
//Hàm giải mã cipher text
function Decipher(input,  _cipherAlphabet,  _plainAlphabet)
{
	//Từ mã cipherAlphabet thay thế thành plainAlphabet => Decipher
	return Cipher(input, cipherAlphabet, plainAlphabet);
}


//Bảng chữ cái Alphabet
var plainAlphabet = "abcdefghijklmnopqrstuvwxyz";
//Bảng chữ cái thay thế Alphabet
var cipherAlphabet= "xnyahpogzqwbtsflrcvmuekjdi";
//Plain text
var text = "Phan Minh Phat";

var cipherText = Encipher(text, cipherAlphabet, plainAlphabet);
console.log(cipherText); 

var plainText = Decipher(cipherText, plainAlphabet, cipherAlphabet);
console.log(plainText);