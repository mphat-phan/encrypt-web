/**
 * 
 * @param {msg} message 
 * @returns array - from alphabet to number
 */
const convertAlphabet = (msg) => {
    const mesAlphabet = [];
    for(const element of msg){
        for(let i = 0; i < alphabet.length; i++){
            if(element == alphabet[i]){
                mesAlphabet.push(i);
                break;
            }
        }
    }
    return mesAlphabet;
}

/**
 * msg : message
 * n : length of matrix
 * @returns matrix - from alphabet to number
 */
const convertMessage = (_msg, m) => {
    const n = ((_msg.length)/m).toFixed();
    //Declare convert mes
    const mes = new Array(n); 
    for(let i = 0; i < n; i++){
        mes[i] = new Array(m);
    }
    //Convert array to matrix
    const convrtAlpha = convertAlphabet(_msg);
    let count = 0;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            mes[i][j] = convrtAlpha[count]; 
            count++;
        }
    }
    return mes;
}

//Mod 26 function
const mod26 = (x) => {
    return x >= 0 ? (x%26) : 26-(Math.abs(x)%26) ;
}

//Find det function
const findDet = (mtx) => {
    let det = null;
    if(mtx.length == 2){
        det = mtx[0][0] * mtx[1][1] - mtx[0][1]*mtx[1][0] ;
    }
    else if (mtx.length == 3)
	{
		det = mtx[0][0]*(mtx[1][1]*mtx[2][2] - mtx[1][2]*mtx[2][1])  - mtx[0][1]*(mtx[1][0]*mtx[2][2] - mtx[2][0]*mtx[1][2] ) + mtx[0][2]*(mtx[1][0]*mtx[2][1] - mtx[1][1]*mtx[2][0]);
	}
    return mod26(det);
}

//Find det inverse function
const findDetInverse = (R , D = 26) => // R is the remainder or determinant
{
    
    const p = [];
    const q = [] ;
    for(let i = 0; i < 100; i++){
        p[i] = 0;
        q[i] = 0;
    }
    p[0] = 0;
	p[1] = 1;
    let i = 0;
	while(R!=0)
	{
		q[i] = Math.trunc(D/R) ;
		let oldD = D ;
		D = R ;
		R = oldD%R ;
		if(i>1)
		{
			p[i] = mod26(p[i-2] - p[i-1]*q[i-2]) ;
		}
		i++ ;
	}
	if (i == 1) return 1;
	else {
        p[i] = mod26(p[i-2] - p[i-1]*q[i-2]);
        return p[i];
    }
}

//Find inverse matrix
const findInverse = (m, n) =>{
	const adj = new Array(n);
    for(let i = 0; i < n; i++){
        adj[i] = new Array(n);
    }

    const m_inverse = new Array(n);
    for(let i = 0; i < n; i++){
        m_inverse[i] = new Array(n);
    }

	const det = findDet(m); // findDet(matrix , order_of_matrix)
	const detInverse = findDetInverse(det);

	if(n==2)
	{
		adj[0][0] = m[1][1];
		adj[1][1] = m[0][0];
		adj[0][1] = -m[0][1];
		adj[1][0] = -m[1][0];
	}
	else if(n==3)
	{
        const temp = new Array(5);
        for(let i = 0; i < 5; i++){
            temp[i] = new Array(5);
        }
		// fill the 5x5 matrix
		for(let i=0; i<5; i++)
		{
			for(let j=0; j<5; j++)
			{
				temp[i][j] = m[i%3][j%3] ;
			}
		}
		/* except first row and first column, multiply elements along rows and place them along columns */
		for(let i=1; i<=3 ; i++)
		{
			for(let j=1; j<=3 ; j++)
			{
				adj[j-1][i-1] = temp[i][j]*temp[i+1][j+1] - temp[i][j+1]*temp[i+1][j];
			}
		}
	}

	for(let i=0; i<n ; i++)
	{
		for(let j=0; j<n ; j++)
		{
			m_inverse[i][j] = mod26(adj[i][j] * detInverse) ;
		}
	}
    return m_inverse;
}

//Encrypt plain text
const encrypt = (msg, mtrx) => {
    
    const convrt_mes = convertMessage(msg,mtrx.length);
    //Declare Array
    const result = new Array(convrt_mes.length);
    for(let i=0; i<convrt_mes.length; i++){
        result[i] = new Array(mtrx.length);
    }

    //Nhân 2 matrix
    for(let i=0;i<convrt_mes.length;++i)
    {
        for(let j=0;j<mtrx.length;++j)
        {
            result[i][j]=0;
            for(let k=0;k<mtrx.length;++k){
                result[i][j]=mod26(result[i][j]+(convrt_mes[i][k]*mtrx[k][j]));
            }
        }
    }
    return printMes(result,mtrx.length);
}

//Decrypt cipher text
const decrypt = (msg, mtrx) => {
    const _cipher_Mes = convertMessage(msg,mtrx.length);
    const inverseMatrix = findInverse([...mtrx],mtrx.length);

    //Declare Array
    const result = new Array(_cipher_Mes.length);
    for(let i=0; i<_cipher_Mes.length; i++){
        result[i] = new Array(inverseMatrix.length);
    }

    //Nhân 2 matrix
    for(let i=0;i<_cipher_Mes.length;++i)
    {
        for(let j=0;j<inverseMatrix.length;++j)
        {
            result[i][j]=0;
            for(let k=0;k<inverseMatrix.length;++k){
                result[i][j]=mod26(result[i][j]+(_cipher_Mes[i][k]*inverseMatrix[k][j]));
            }
        }
    }
    return printMes(result,mtrx.length);

}

//Print message string
const printMes = (_text, n) => {
    const params = [];
    for(let i = 0; i < _text.length; i++){
        for(let j = 0; j < n; j++){
            params.push(alphabet[_text[i][j]]);
        }
    }
    return params.join('');
}

//Find space index of message
const spaceIndexs = (_message) => {
    const spaceIndex = [];
    let index = 0;
    for(let i = 0; i < _message.length; i++){
        
        if(_message[i] == ' ' || _message[i] == '\t' || _message[i] == '\n'){
            spaceIndex.push(i - index);
            index++;
        } 
    }

    return spaceIndex;
}

//Check Lowercase in string fn
const isLower = (str) => {
    return /[a-z]/.test(str) && !/[A-Z]/.test(str);
}

//Check Lowercase in string fn
const isUpper = (str) => {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}
//Find lower index of message
const lowerIndexs = (_message) => {
    const lowerIndex = [];
    let index = 0;
    for(let i = 0; i < _message.length; i++){
        
        if(isLower(_message[i])){
            lowerIndex.push(i);
            index++;
        } 
    }

    return lowerIndex;
}

//Remove space message fn 
const removeSpaceMsg = (_message) => {
    _message = _message.replace(/\s+/g, '');
    return _message;
}

//Undo root message
const undoMsg = (space, lower, msg, n) => {
    const root = []; 
    let indexSpace = 0;
    let indexLower = 0;
    //Add space to msg
    for(let i=0; i<n; i++){
        if(i == space[indexSpace]){
            root.push(' ');
            root.push(msg[i]);
            indexSpace++;
            continue;
        }
        else{
            root.push(msg[i]);
        }
    }
    //Lower msg
    for(let i=0; i<n; i++){
        if(i == lower[indexLower] && isUpper(root[i])){
            root[i] = lowerStr(root[i]);
            indexLower++;
        }
    }
    return root.join('');
}

//Convert Upper string function
const upperStr = (_message) => {
    return _message.toUpperCase();
}

//Convert lower string function
const lowerStr = (_message) => {
    return _message.toLowerCase();
}

//Convert root msg to filter msg function
const filterMsg = (_message) => {
    let msg = upperStr(_message);
    msg = removeSpaceMsg(msg);
    return msg;
}

//Alphabet 25 words
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

//Inverse 2d Matrix
var matrix2dInput = [
    [ 3, 12 ], [ 2, 5]
];

//Inverse 3d Matrix
var matrix3dInput = [
    [17,   17,   5],
    [21,   18,   21],
    [2,    2,    19]
];

//Root message
const rootMessage = "Phan Minh Phat xin chao moi nguoi nhe";
//Filter message
const filterMessage = filterMsg(rootMessage);

let spaceIndexArr = spaceIndexs(rootMessage);
let lowerIndexArr = lowerIndexs(rootMessage);

//Print cipher text
const cipherMessage = encrypt(filterMessage,[...matrix2dInput]);
const undo_cipherMessage = undoMsg(spaceIndexArr,lowerIndexArr,cipherMessage, rootMessage.length);
console.log(undo_cipherMessage);

//Filter cipher message
const filterCipherMessage = filterMsg(undo_cipherMessage);

spaceIndexArr = spaceIndexs(undo_cipherMessage);
lowerIndexArr = lowerIndexs(undo_cipherMessage);

//Print plant text
const plainMessage = decrypt(filterCipherMessage,[...matrix2dInput]);
console.log(undoMsg(spaceIndexArr,lowerIndexArr,plainMessage, undo_cipherMessage.length));


