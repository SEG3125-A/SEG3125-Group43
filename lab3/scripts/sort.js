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

function filterItems(items, query) {
    return items.filter(item => {
        // Filtering based on client dietary choices
        return (user.diet.length === 0 || item.diet.some(choice => user.diet.includes(choice))) && item.item.toLowerCase().includes(query.toLowerCase());
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

        // Is this really necessary? Criteria is always null when this is called and provides no functionality to the current project
        // Furthermore, commenting out this load entirely does not affect the app AFAIK 

        // Call the loadProductsPage function with the sorting criteria and order
        // loadProductsPage(criteria, order);
    }
});

// Change listener for the price range selector to update the display as well as the user object datastore
window.addEventListener('input', function (e) {
    if (e.target.tagName === 'INPUT' && e.target.type === 'range' && e.target.parentElement.classList.contains('price-selector-container')) {
        const priceRangeInput = document.querySelector('#price-selector');
        // Determine the sorting criteria and order
        let value = priceRangeInput.value;
        // console.log("Current price range: " + value);
        document.querySelector("#price-selector-max").innerHTML = `${value}`;
        user.max = value;
    }
});