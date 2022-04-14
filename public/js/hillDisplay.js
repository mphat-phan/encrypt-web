export const displayHillKeyInput = (elm,n) => {
    let html = '';
    for(let i = 0; i < n; i++){
        html+= `<div style="display: flex;">`;
        for(let j = 0; j < n; j++){ 
            html+= `
                <input 
                type="text"
                class="form-control hillMatrixInput-${elm}"
                style="width:50px;text-align:center;"
                >
            `
        }
        html+=`</div>`;
    }
    return html;
}

export const displayHillKey = (elm) => {
    return `
        <select class="form-select" id="hillSelect-${elm}" aria-label="Default select example">
            <option value="2" selected>Two Direction Matrix 2 x 2</option>
            <option value="3">Three Direction Matrix 3 x 3</option>
        </select>
       
        <div class="row">
            <div class="col">
                <div id= "hillMatrix-${elm}" class="mt-3">
                    ${displayHillKeyInput(elm,2)}
                <div>
            </div>
        </div>
        
    `
}