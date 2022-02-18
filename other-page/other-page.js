import { checkAuth, logout, completeItem, createItem, deleteAllItems, getItems } from '../fetch-utils.js';
import { renderItem } from '../render-utils.js';

checkAuth();

const itemForm = document.querySelector('.item-form');
const deleteButton = document.querySelector('.delete-button');
const logoutButton = document.getElementById('logout');

async function renderItems() {
    const derp = document.getElementById('listing');
    derp.textContent = '';
    const items = await getItems();
    for (let item of items) {
        const li = renderItem(item);
        li.addEventListener('click', async () => {
            await completeItem(item.id);
            renderItems();
        });
        derp.append(li);
    }
    
}
renderItems();



itemForm.addEventListener('submit', async (e) => {
    e.preventDefault;
    
    const itemData = new FormData(itemForm);
    const item = itemData.get('items');
 
    await createItem(item);
    renderItems();
     
});



logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    await deleteAllItems();
    renderItems(); 
});