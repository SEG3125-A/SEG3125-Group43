function sort(items, criteria, order) {
    if (criteria === 'item') {
        if (order === 'asc') {
            items.sort((a, b) => a.item.localeCompare(b.item));
        } else {
            items.sort((a, b) => b.item.localeCompare(a.item));
        }
    } else if (criteria === 'price') {
        if (order === 'asc') {
            items.sort((a, b) => a.price - b.price);
        } else {
            items.sort((a, b) => b.price - a.price);
        }
    } else if (criteria === 'diet') {
        if (order === 'asc') {
            items.sort((a, b) => a.diet - b.diet);
        } else {
            items.sort((a, b) => b.diet - a.diet);
        }
    }
}

function filterItems(items) {
    return items.filter(item => {
        // Filtering based on client dietary choices
        return user.diet.length === 0 || item.diet.some(choice => user.diet.includes(choice));
    });
}

function handleSortChange() {
    // Determine the sorting criteria and order
    let order = sortPriceCheckbox.checked ? 'desc' : 'asc';

    // Call the loadProductsPage function with the sorting criteria and order
    loadProductsPage('price', order);
}

window.addEventListener('change', function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox' && e.target.parentElement.classList.contains('sorter-options')) {
        const sortPriceCheckbox = document.querySelector('#sort-price');
        // Determine the sorting criteria and order
        let order = sortPriceCheckbox.checked ? 'desc' : 'asc';

        // Call the loadProductsPage function with the sorting criteria and order
        loadProductsPage(criteria, order);
    }
});