#include <iostream>
#include<fstream>
using namespace std;

string encrypt(string text, int s)
{
	
    string result = ""; //Biên luu bang ma
 
    // Lap de ma hoa tung ky tu
    for (int i=0;i<text.length();i++)
    {
		//Kiem tra truong hop khoang trang
    	if(isspace(text[i])){
			result+=" ";
			continue;
		}
		
		if(text[i] == '\n'){
			result+="\n";
			continue;
		}

        // Mã hóa ký tu hoa
    	if (isupper(text[i]))
    	//THuat toan x+n mod 26 , dich chuyen n vi trí s
        result += char(int(text[i]+s-65)%26 +65);

	    // Ma hoa ky tu thuong
	    else
	        result += char(int(text[i]+s-97)%26 +97);
	
        
	}
 
  
    return result;
}
 

int main()
{
	
	ifstream fin;
	fin.open("input.txt",ios::in);
	ofstream fout;
	fout.open("output.txt",ios::out);
	
	string text="";
    string line;
    while (!fin.eof()){
        getline(fin, line);
        text+=line;
    }

    int s;
    cout << "Nhap so buoc:";
    cin>>s;
    cout << "\nCipher: " << encrypt(text, s);
    
    fout<<encrypt(text, s);
    return 0;
}
