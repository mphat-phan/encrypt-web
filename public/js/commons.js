export const filterArr = (arr,slug) => {
    for(let i=0; i<arr.length; i++){
        if(arr[i].slug == slug){
            return arr[i];
        }
    }
}

export const displayResult = (result,elm) => {
    elm.innerHTML = result;
}
