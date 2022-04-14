export const displayMenu = (arr) => {
    return arr.map(enc => {
        return `
            <li><a class="dropdown-item" href="?q=${enc.slug}">${enc.name}</a></li>
        `;
    }).join('');
}

export const displayBreadcrumb = (x) => {
    return `
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Danh sách thuật toán mã hóa</a></li>
            <li class="breadcrumb-item active" aria-current="page">${x.name}</li>
        </ol>
    `
}