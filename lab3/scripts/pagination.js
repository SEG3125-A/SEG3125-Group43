// Calculate the total number of pages
function getTotalPages(items) {
    return Math.ceil(items.length / itemsPerPage);
}

function calculateItemsPerPage() {
    const matchingItems = items.filter(item => item.diet.some(choice => user.diet.includes(choice)));
    return Math.ceil(matchingItems.length / 2);
}

// Update the page numbers
function updatePageNumbers(items) {
    const totalPages = getTotalPages(items);

    // Clear the page numbers
    document.querySelector('.page-numbers').innerHTML = '';

    // Add the page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNumberElement = document.createElement('button');
        pageNumberElement.textContent = i;
        pageNumberElement.addEventListener('click', () => {
            currentPage = i;
            loadProductsPage();
        });
        pageNumberElement.setAttribute("style", "position: relative; bottom: 100px; border: none; margin-right: 7px; background-color: transparent; color: " + (i === currentPage ? "green" : "#000") + "; font-size: 1.2em; font-family: 'Roboto', sans-serif; cursor: pointer; margin: 0 5px;")
        document.querySelector('.page-numbers').appendChild(pageNumberElement);
    }
}