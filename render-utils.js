export function renderItem(item) {
    const li = document.createElement('li');
    if (item.complete) {
        li.classList.add('complete');
    }
    li.textContent = item.description;
    return li;
}