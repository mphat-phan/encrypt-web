import * as constants from "../Encryption JS/constants/index.js";
import { mod26,filterMsg,undoMsg } from "./commons/index.js";

/**
 * 
 * @param {msg} message 
 * @returns array - from constants.alphabet to number
 */

const convertAlphabet = (msg) => {
    const mesAlphabet = [];
    for(const element of msg){
        for(let i = 0; i < constants.alphabet.length; i++){
            if(element == constants.alphabet[i]){
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
 * @returns matrix - from constants.alphabet to number
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
    let i;
    for(i = 0; i < 100; i++){
        p[i] = 0;
        q[i] = 0;
    }
    p[0] = 0;
	p[1] = 1;
    i = 0;
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
export const encrypt = (msg, mtrx) => {
    
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
export const decrypt = (msg, mtrx) => {
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
            params.push(constants.alphabet[_text[i][j]]);
        }
    }
    return params.join('');
}

//Root message
const rootMessage = "Phan Minh Phat xin chao moi nguoi nhe";
//Filter message
const filterMessage = filterMsg(rootMessage);

//Print cipher text
const cipherMessage = encrypt(filterMessage,[...constants.threeDMatrix]);
const undo_cipherMessage = undoMsg(cipherMessage, rootMessage);

//Filter cipher message
const filterCipherMessage = filterMsg(undo_cipherMessage);
 

//Print plant text
const plainMessage = decrypt(filterCipherMessage,[...constants.threeDMatrix]);