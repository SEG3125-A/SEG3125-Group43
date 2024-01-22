// Fetch the JSON data
fetch("./scripts/products.json")
    .then(response => response.json())
    .then(data => {
        // Get the product grid element
        const productGrid = document.querySelector('.product-grid');

        // Remove all existing items
        while (productGrid.firstChild) {
            productGrid.firstChild.remove();
        }

        // Loop through the items
        data.forEach(item => {
            // Create a new item element
            const itemElement = document.createElement('div');
            itemElement.className = 'item reveal';

            // Set the item's HTML
            itemElement.innerHTML = `
                <img src="${item.image}" alt="IMAGE">
                <p class="title">${item.item}</p>
                <p class="price">${item.price}</p>
                <span class="add-button reveal"><p>ADD TO CART</p></span>
            `;

            // Add the item element to the product grid
            productGrid.appendChild(itemElement);
        });
    });