export const displaySubtitule = (elm) => {
    return `
        <div class="mb-3">
            <label for="" class="form-label">Bản alphabet 26 chữ cái</label>
            <input type="email" class="form-control" placeholder="ABCDEFGHIJKLMNOPQRSTUVWXYZ" disabled>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Bản thay thế thứ tự alphabet</label>
            <input type="email" class="form-control" id="subtituteInput-${elm}" placeholder="BEDGE...WZY">
        </div>
    `;
}