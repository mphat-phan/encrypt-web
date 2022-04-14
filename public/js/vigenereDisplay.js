export const displayVigenere = (elm) => {
    return `
    <div class="input-group mb-3">
    <input type="text" class="form-control vigenerekey-${elm}" placeholder="Nhập chuỗi ký tự khóa" aria-label="Username">
    `;
}